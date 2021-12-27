/**
* App entrypoint.
*/
'use strict';

const app = require('express')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set up Express.
require('./server/setup/express')(app);

// Set up routes.
app.use('/', require('./server/routes'));

module.exports = app;
