/**
 * @brief Se encarga de los detalles vitales del backend, como las sesiones, la gestión de errores y el enrutamiento.
 * @returns 
 */
const express = require('express');
/**
 * @brief Conecta la ruta "companyController"
 * @returns 
 */
const companyController = require('../controllers/company-controller');
/**
 * @brief Conecta con la ruta "express.Router"
 * @returns 
 */
const router = express.Router();

router.get('/companies', companyController.findCompanies);
router.get('/companies/:companyId', companyController.findOneCompany);
router.post('/companies', companyController.createCompany);
router.put('/companies/:companyId', companyController.updateCompany);
router.delete('/companies/:companyId', companyController.deleteCompany);

module.exports = router;
