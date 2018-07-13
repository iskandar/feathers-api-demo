const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');
const swagger = require('feathers-swagger');
const cors = require('cors')
const elasticsearch = require('elasticsearch');

const faker = require('faker');
const Users = require('./lib/users');
const Leads = require('./lib/leads');
const Messages = require('./lib/messages');
const Cats = require('./lib/cats');

const esIndex = 'users';

var esClient = new elasticsearch.Client({
  host: 'localhost:4571',
  log: 'info'
});

// Some ugly callbacks to init ES
esClient.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
    // Delete everything!
    esClient.indices.delete({
        index: '*',
        ignore: [404]
      }).then(function (body) {
        start();
      }, function (error) {
        // oh no!
      });
  }
});

function start() {
    const app = express(feathers());

    // Turn on JSON body parsing for REST services
    app.use(express.json())
    // Turn on URL-encoded body parsing for REST services
    app.use(express.urlencoded({ extended: true }));
    // Set up REST transport using Express
    app.configure(express.rest());
    // Add permissive CORS headers
    app.use(cors())

    // Set up authentication
    app.configure(auth({ secret: 'supersecret' }));
    app.configure(local());
    app.configure(jwt());

    // Set up Swagger docs
    app.configure(swagger({
        docsPath: '/docs',
        uiIndex: true,
        info: {
            title: 'Leads API',
            description: 'A demo RESTful API'
        }
    }));

    const services = {
        "Users": Users(esClient),
        "Leads": Leads(esClient),
        "Messages": Messages(esClient),
        "Cats": Cats(esClient),
    }
    app.use('users', services['Users']);
    app.use('leads', services['Leads']);
    app.use('messages', services['Messages']);
    app.use('cats', services['Cats']);

    // Seed some dummy data
    const seed = 5678;
    faker.seed(seed);

    const catCount = 5;
    process.stdout.write("Generating " + catCount + " Cats ");
    for (let i = 0; i < catCount; i += 1) {
        process.stdout.write(".");
        app.service('cats').create(services['Cats'].generate());
    }
    console.log("");

    const userCount = 5;
    process.stdout.write("Generating " + userCount + " Users ");
    for (let i = 0; i < userCount; i += 1) {
        process.stdout.write(".");
        app.service('users').create(services['Users'].generate());
    }
    console.log("");

    const leadCount = 50;
    process.stdout.write("Generating " + leadCount + " Leads ");
    for (let i = 0; i < leadCount; i += 1) {
        process.stdout.write(".");
        app.service('leads').create(services['Leads'].generate());
    }
    console.log("");

    const messageCount = 2;
    process.stdout.write("Generating " + messageCount + " Messages ");
    for (let i = 0; i < messageCount; i += 1) {
        process.stdout.write(".");
        app.service('messages').create(services['Messages'].generate());
    }
    console.log("");

    // Set up an error handler that gives us nicer errors
    app.use(express.errorHandler());

    // Start the server on port 3030
    const server = app.listen(3030);

    server.on('listening', () => console.log('REST API started at http://localhost:3030'));
}