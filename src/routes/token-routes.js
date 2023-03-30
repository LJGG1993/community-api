/**
 * @brief Se encarga de los detalles vitales del backend, como las sesiones, la gestión de errores y el enrutamiento.
 * @returns 
 */
const express = require('express');
/**
 * @brief Conecta la ruta "tokenController"
 * @returns 
 */
const tokenController = require('../controllers/token-controller');
/**
 * @brief Conecta con la ruta "express.Router"
 * @returns 
 */
const router = express.Router();

router.post('/user/recover-password', tokenController.sendTokentoMail);

module.exports = router;
