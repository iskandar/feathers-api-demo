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
      index: 'leads',
      type: 'leads'
    }
  });

  // swagger spec for this service, see http://swagger.io/specification/{
  service.docs = {
      description: 'A service to manage Leads',
      idType: 'string',
      definitions: {
        'leads list': {
          "type": "array",
          "items": {
            "type": "leads"
          }
        },
        leads: {
          "type": "object",
          "required": [
            "submitter",
            "title",
            "summary"
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
            "title": {
              "type": "string",
              "description": "The Lead title"
            },
            "summary": {
              "type": "string",
              "description": "The Lead summary"
            },
            "_id": {
              "type": "string",
              "description": "The id of the the Lead"
            }
          }
        }
      }
  };

  service.generate = function() {
    return {
      "created": faker.date.past(),
      "submitter": faker.internet.email(),
      "title": faker.company.catchPhrase(),
      "summary": faker.lorem.paragraph()
    };
  }

  return service;
};
