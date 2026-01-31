const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CSE 341 Contacts API',
    version: '1.0.0',
    description: 'API documentation for the CSE 341 Contacts project'
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Local server'
    },
    {
      url: 'https://YOUR-RENDER-URL.onrender.com',
      description: 'Production server'
    }
  ],
  components: {
    schemas: {
      Contact: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
        properties: {
          firstName: {
            type: 'string',
            example: 'John'
          },
          lastName: {
            type: 'string',
            example: 'Doe'
          },
          email: {
            type: 'string',
            example: 'john.doe@example.com'
          },
          favoriteColor: {
            type: 'string',
            example: 'Blue'
          },
          birthday: {
            type: 'string',
            example: '1990-01-01'
          }
        }
      }
    }
  },
  paths: {
    '/contacts': {
      get: {
        summary: 'Get all contacts',
        responses: {
          200: {
            description: 'Array of contacts',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Contact' }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Create a new contact',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Contact' }
            }
          }
        },
        responses: {
          201: {
            description: 'Contact created'
          }
        }
      }
    },
    '/contacts/{id}': {
      get: {
        summary: 'Get a contact by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Contact found'
          },
          404: {
            description: 'Contact not found'
          }
        }
      },
      put: {
        summary: 'Update a contact',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Contact' }
            }
          }
        },
        responses: {
          204: {
            description: 'Contact updated'
          },
          404: {
            description: 'Contact not found'
          }
        }
      },
      delete: {
        summary: 'Delete a contact',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Contact deleted'
          },
          404: {
            description: 'Contact not found'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: []
};

module.exports = swaggerJSDoc(options);
