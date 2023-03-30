/**
 * @brief Se encarga de los detalles vitales del backend, como las sesiones, la gestión de errores y el enrutamiento
 * @returns 
 */
const express = require('express');
/**
 * @brief Se encarga del enrutamiento del controlador "communityController"
 * @returns 
 */
const communityController = require('../controllers/community-controller');
/**
 * @brief Conecta con la ruta "express.Router"
 * @returns 
 */
const router = express.Router();

router.get('/communities', communityController.findCommunities);
router.get('/communities/:communityId', communityController.findOneCommunity);
router.post('/communities', communityController.createCommunity);
router.put('/communities/:communityId', communityController.updateCommunity);
router.delete('/communities/:communityId', communityController.deleteCommunity);
module.exports = router;
