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
      index: 'cats',
      type: 'cats'
    }
  });

  service.colours = [
    'black',
    'grey',
    'red',
    'yellow'
  ];

  // swagger spec for this service, see http://swagger.io/specification/{
  service.docs = {
      description: 'A service to manage Cats',
      idType: 'string',
      definitions: {
        'cats list': {
          "type": "array",
          "items": {
            "type": "cats"
          }
        },
        cats: {
          "type": "object",
          "required": [
            "name",
            "colour",
          ],
          "properties": {
            "created": {
              "type": "string",
              "format": "date-time",
              "description": "The cat's created date"
            },
            "name": {
              "type": "string",
              "description": "The cat name"
            },
            "colour": {
              "type": "string",
              "description": "The cat colour"
            },
            "_id": {
              "type": "string",
              "description": "The id of the the Cat"
            }
          }
        }
      }
  };

  service.generate = function() {
    return {
        "name": faker.internet.userName(),
        "colour": faker.random.arrayElement(service.colours)
    };
  }

  return service;
};
