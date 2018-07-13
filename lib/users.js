const faker = require('faker');
const esService = require('feathers-elasticsearch');

module.exports = function(esClient) {
  let service = esService({
    Model: esClient,
    paginate: {
      default: 10,
      max: 50
    },
    elasticsearch: {
      index: 'users',
      type: 'users'
    }
  });

  // swagger spec for this service, see http://swagger.io/specification/{
  service.docs = {
      description: 'A service to manage Users',
      idType: 'string',
      definitions: {
        'users list': {
          "type": "array",
          "items": {
            "type": "users"
          }
        },
        users: {
          "type": "object",
          "required": [
            "text"
          ],
          "properties": {
            "created": {
              "type": "string",
              "format": "date-time",
              "description": "The User's created date"
            },
            "username": {
              "type": "string",
              "description": "The User's username"
            },
            "email": {
              "type": "string",
              "description": "The User's Email address"
            },
            "avatarUrl": {
              "type": "string",
              "description": "The User's Profile pic URL"
            },
            "_id": {
              "type": "string",
              "description": "The id of the the User"
            }
          }
        }
      }
  };

  service.generate = function() {
    return {
        "created": faker.date.past(),
        "email": faker.internet.email(),
        "username": faker.internet.userName(),
        "avatarUrl": faker.internet.avatar()
    };
  }

  return service;
};
