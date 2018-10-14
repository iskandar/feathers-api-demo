// Google Utils
require('@google-cloud/trace-agent').start();

// See https://cloud.google.com/profiler/docs/profiling-nodejs
require('@google-cloud/profiler').start({
    serviceContext: {
        service: 'api-demo',
        version: process.env.TAG || ""
    }
});

// See https://github.com/googleapis/cloud-debug-nodejs/blob/master/README.md
require('@google-cloud/debug-agent').start({
    allowExpressions: true,
    serviceContext: {
        service: 'api-demo',
        version: process.env.TAG || ""
    }
});


const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');
const swagger = require('feathers-swagger');
const cors = require('cors')
const elasticsearch = require('elasticsearch');

const ErrorReporting = require('@google-cloud/error-reporting').ErrorReporting;
const errors = new ErrorReporting();

const faker = require('faker');
const Users = require('./lib/users');
const Leads = require('./lib/leads');
const Messages = require('./lib/messages');
const Cats = require('./lib/cats');

const esIndex = 'users';

var esClient = new elasticsearch.Client({
  host: process.env.ELASTIC_HOST || 'localhost:4571',
  log: 'info'
});

// Some ugly callbacks to init ES
esClient.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
    errors.report('Elasticsearch Cluster appears down');
  } else {
    console.log('All is well');
    // Delete everything!
    // esClient.indices.delete({
    //     index: 'cats',
    //     ignore: [404]
    //   }).then(function (body) {
    //     start();
    //   }, function (error) {
    //     // oh no!
    //     console.trace(error);
    //   });
    start();
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

    // A few example routes for testing and demos
    app.get('/status', (req, res) => {
        status = {
            service: 'api-demo',
            demo: "coffee",
            VERSION: process.env.VERSION || "1.0.0",
            TAG: process.env.TAG || "",
            HOSTNAME: process.env.HOSTNAME || "",
            NODE_ENV: process.env.NODE_ENV || "",
            NODE_VERSION: process.env.NODE_VERSION || "",
            YARN_VERSION: process.env.YARN_VERSION || ""
        };
        res.json(status);
    });
    // Return an error
    app.get('/errorx', (req, res, next) => {
        res.send('Something broke!');
        next(new Error('Here is an errror!'));
    });
    // Call a missing function
    app.get('/crashx', (req, res, next) => {
        req.FOOBAR();
    });
    // Trigger a JSON error
    app.get('/jsonx', () => {
      JSON.parse('{"malformedJson": true');
    });

    // Seed some dummy data
    const seed = 5678;
    faker.seed(seed);

    // Seed some things
    app.get('/seed', (req, res) => {
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
        res.json({ "ok": true });
    });

    // const leadCount = 50;
    // process.stdout.write("Generating " + leadCount + " Leads ");
    // for (let i = 0; i < leadCount; i += 1) {
    //     process.stdout.write(".");
    //     app.service('leads').create(services['Leads'].generate());
    // }
    // console.log("");

    // const messageCount = 2;
    // process.stdout.write("Generating " + messageCount + " Messages ");
    // for (let i = 0; i < messageCount; i += 1) {
    //     process.stdout.write(".");
    //     app.service('messages').create(services['Messages'].generate());
    // }
    // console.log("");

    // Set up an error handler that gives us nicer errors
    // app.use(express.errorHandler());

    // Add Google Error Reporting
    app.use(errors.express);

    // Start the server on port $PORT
    port = process.env.PORT || 3030
    const server = app.listen(port);

    server.on('listening', () => console.log('REST API started at http://localhost:' + port));
}