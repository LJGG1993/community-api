/**
 * @brief Se encarga de los detalles vitales del backend, como las sesiones, la gestión de errores y el enrutamiento
 * @returns 
 */
const express = require('express');
/**
 * @brief Se encarga del enrutamiento del controlador "loginController"
 * @returns 
 */
const loginController = require('../controllers/login-controller');
/**
 * @brief Conecta con la ruta "express.Router"
 * @returns 
 */
const router = express.Router();

router.post('/login', loginController.getData);

module.exports = router;
