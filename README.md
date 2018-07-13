# Demo API and Admin Web App

Example code used with the APIs for Architects slide deck.

## Stuff you'll need to run the code

* nodejs: npm, nodemon, yarn
* docker and docker-compose

# Getting started

There are two apps represented in this repository.

1. The main app. An API with entrypoint `index.js` is the API server.
2. The Admin Web app. A web application contained within `test-admin/`.

These apps each are built and run separately.

# Persistence

Data persistence is provided by Elasticsearch on the default port provided by `localstack`.

To run Elasticsearch, use

`docker-compose up`

# API App

This app is basic JavaScript and doesn't require any transpiling or other processing.

First, fetch dependencies with

`yarn`

To run it, use

`nodemon index.js`

This will create a server listening on port `3030`

* API user list: `open http://localhost:3030/users`
* Swagger UI: `open http://localhost:3030/docs`

# Admin Web App

This is a React app created with the `create-react-app` CLI tool. This app uses multiple JavaScript tools to transpile and package the resulting files.

The commands below must be run while in the `test-admin` directory.

First, fetch dependencies with

`yarn`

Then run the app with

`yarn start`

Note that authentication is enabled but any username and password will work.

* Admin UI: `open http://localhost:3000`
