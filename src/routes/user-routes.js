/**
 * @brief Se encarga de los detalles vitales del backend, como las sesiones, la gestión de errores y el enrutamiento.
 * @returns 
 */
const express = require('express');
/**
 * @brief Conecta la ruta "companyController"
 * @returns 
 */
const userController = require('../controllers/user-controller');
/**
 * @brief Conecta con la ruta "express.Router"
 * @returns 
 */
const router = express.Router();

router.get('/users', userController.findUsers);
router.get('/users/:userId', userController.findOneUser);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);
router.post('/users/new-password', userController.setNewPassword);
router.post('/users/mail', userController.findUserByEmail);

module.exports = router;
