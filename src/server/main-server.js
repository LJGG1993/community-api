/**
 * @brief este grupo de variables const son para mandar llamar otros archivos a esta ruta.
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

const { PORT } = process.env;

const user = require('../routes/user-routes');
const company = require('../routes/company-routes');
const event = require('../routes/event-routes');
const community = require('../routes/community-routes');
const login = require('../routes/login-routes');
const token = require('../routes/token-routes');

const verifyToken = require('../routes/validate-token');
/**
 * @brief function middlewares es para intercambiar informacion entre aplicaciones.
 * @param {*} app 
 */
function middleWares(app) {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
}
/**
 * brief function assingroutes es para asignar rutas a las categorias.
 * @param {*} app 
 */
function assingRoutes(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('', login);
  app.use('', token);
  app.use('', verifyToken, event);
  app.use('', verifyToken, user);
  app.use('', verifyToken, company);
  app.use('', verifyToken, community);
}
/**
 * @brief function main es para asignar las apps.
 */
function main() {
  const app = express();
  middleWares(app);
  assingRoutes(app);
  app.listen(PORT, () => {
    console.log(`Server listening port: ${PORT}`);
  });
}

module.exports = main;
