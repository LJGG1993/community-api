/**
 * @brief Se encarga de los detalles vitales del backend, como las sesiones, la gestión de errores y el enrutamiento
 * @returns 
 */const express = require('express');
 /**
 * @brief Se encarga del enrutamiento del controlador "generate"
 * @returns 
 */
const generate = require('../services/generatePass-service');
/**
 * @brief Conecta con la ruta "express.Router"
 * @returns 
 */
const router = express.Router();

router.get('', generate);

module.exports = router;
