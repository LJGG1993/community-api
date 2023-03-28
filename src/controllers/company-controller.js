const joi = require('joi');
const companyService = require('../services/company-service');

const company = joi.object({
  name: joi.string().min(3).max(50).required(),
  location: joi.string().min(3).max(50).required(),
  description: joi.string().min(3).max(50).required(),
  web: joi.string().min(3).max(50).required(),
  contact: joi.string().min(3).max(50).required(),
});
/**
 * @brief esto es para encontrar compañias
 */
const findCompanies = async (req, res) => {
  try {
    const allCompanys = await companyService.findCompanies();
    res.status(200).send({
      status: 'OK',
      data: allCompanys,
    });
  } catch (error) {
    res.status(404).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};
/**
 * @brief esto es para encontrar una comunidad
 * @param {*} req 
 * @param {*} res 
 */
const findOneCompany = async (req, res) => {
  const {
    params: { companyId },
  } = req;
  if (!companyId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':companyId' can not be empty" },
    });
  }
  try {
    const companyD = await companyService.findOneCompany(companyId);
    res.status(200).send({ status: 'OK', data: companyD });
  } catch (error) {
    res.status(404).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};
/**
 * @brief esto es para crear una compañia
 * @param {*} req 
 * @param {*} res 
 */
const createCompany = async (req, res) => {
  const result = company.validate(req.body);
  if (result.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: result.error.details },
    });
  } else {
    try {
      await companyService.createNewCompany(result.value);
      res.status(201).send({ status: 'OK', data: result.value });
    } catch (error) {
      res.status(404).send({
        status: 'FAILED',
        data: { error: error?.message || error },
      });
    }
  }
};
/**
 * @brief Para subir una compañia
 * @param {*} req 
 * @param {*} res 
 */
const updateCompany = async (req, res) => {
  const {
    body,
    params: { companyId },
  } = req;
  const result = company.validate(body);
  if (result.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: result.error.details },
    });
  } else {
    try {
      await companyService.updateCompany(result.value, companyId);
      res.status(202).send({ status: 'OK', data: result.value });
    } catch (error) {
      res.status(404).send({
        status: 'FAILED',
        data: { error: error?.message || error },
      });
    }
  }
};
/**
 * @brief para eliminar una compañia
 * @param {*} req 
 * @param {*} res 
 */
const deleteCompany = async (req, res) => {
  const {
    params: { companyId },
  } = req;
  if (!companyId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':companyId' can not be empty" },
    });
  }
  try {
    await companyService.deleteCompany(companyId);
    res.status(202).send({ status: 'OK', message: 'Delete company success' });
  } catch (error) {
    res.status(404).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  findCompanies,
  findOneCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
