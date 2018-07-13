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
      index: 'messages',
      type: 'messages'
    }
  });

  // swagger spec for this service, see http://swagger.io/specification/{
  service.docs = {
      description: 'A service to manage Messages',
      idType: 'string',
      definitions: {
        'messages list': {
          "type": "array",
          "items": {
            "type": "messages"
          }
        },
        messages: {
          "type": "object",
          "required": [
            "text"
          ],
          "properties": {
            "created": {
              "type": "string",
              "format": "date-time",
              "description": "The Lead creation date"
            },
            "submitter": {
              "type": "string",
              "description": "The User's username"
            },
            "text": {
              "type": "string",
              "description": "The message title"
            },
            "_id": {
              "type": "string",
              "description": "The id of the the message"
            }
          }
        }
      }
  };

  service.generate = function() {
    return {
        "created": faker.date.past(),
        "submitter": faker.internet.email(),
        "text": faker.lorem.paragraph()
    };
  }

  return service;
};
