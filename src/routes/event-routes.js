/**
 * @brief Se encarga de los detalles vitales del backend, como las sesiones, la gestión de errores y el enrutamiento
 * @returns 
 */
const express = require('express');
/**
 * @brief Se encarga del enrutamiento del controlador "eventController"
 * @returns 
 */
const eventController = require('../controllers/event-controller');
/**
 * @brief Conecta con la ruta "express.Router"
 * @returns 
 */
const router = express.Router();

router.get('/events', eventController.findEvents);
router.post('/events', eventController.createNewEvent);
router.get('/events/:eventId', eventController.findOneEvent);
router.put('/events/:eventId', eventController.updateEvent);
router.delete('/events/:eventId', eventController.deleteEvent);

module.exports = router;
