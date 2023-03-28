const joi = require('joi').extend(require('@joi/date'));

const userService = require('../services/user-service');
/**
 * @brief sirve para registrarte en la plataforma
 */
const user = joi.object({
  mail: joi.string().email().max(100),
  password: joi.string().min(8).max(100),
  name: joi.string().min(3).max(50).required(),
  lastname: joi.string().min(3).max(100).required(),
  curp: joi.string().uppercase().max(20).required(),
  birth_date: joi.date().utc().format('YYYY-MM-DD').required(),
  gender: joi.string().max(20).required(),
  state: joi.string().max(50).required(),
  town: joi.string().max(50).required(),
  neighborhood: joi.string().max(50).required(),
  program: joi.string().max(100).required(),
  tags: joi.string().max(15).required(),
  emprendedor: joi.string().max(20).required(),
  aliado: joi.string().max(20).required(),
  type: joi.string().max(20),
});

const newPass = joi.object({
  uuid: joi.string().guid({ version: 'uuidv4' }).required(),
  password: joi.string().min(8).max(100).required(),
});

const mailScheme = joi.object({
  mail: joi.string().email().max(100),
});
/**
 * @brief sirve para encontrar usuarios
 * @param {*} req 
 * @param {*} res 
 */
const findUsers = async (req, res) => {
  try {
    const allUsers = await userService.findUsers();
    res.status(200).send({
      status: 'OK',
      data: allUsers,
    });
  } catch (error) {
    res.status(404).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};
/**
 * @brief sirve para encontar un usuario especifico
 * @param {*} req 
 * @param {*} res 
 */
const findOneUser = async (req, res) => {
  const {
    params: { userId },
  } = req;
  if (!userId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':userId' can not be empty" },
    });
  }
  try {
    const userD = await userService.findOneUser(userId);
    res.status(200).send({ status: 'OK', data: userD });
  } catch (error) {
    res.status(404).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};
/**
 * @brief sirve para creear un usuario
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
  const result = user.validate(req.body);
  if (result.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: result.error.details },
    });
  } else {
    try {
      await userService.createNewUser(result.value);
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
 * @brief sirve para actualizar usuarios
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = async (req, res) => {
  const {
    body,
    params: { userId },
  } = req;
  const result = user.validate(body);

  if (result.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: result.error.details },
    });
  } else {
    try {
      await userService.updateUser(result.value, userId);
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
 * @brief sirve para eliminar usuarios
 * @param {*} req 
 * @param {*} res 
 */
const deleteUser = async (req, res) => {
  const {
    params: { userId },
  } = req;
  if (!userId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':userId' can not be empty" },
    });
  }
  try {
    await userService.deleteUser(userId);
    res.status(202).send({ status: 'OK', message: 'Delete user success' });
  } catch (error) {
    res.status(404).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};
/**
 * @brief sirve para cambiar contraseñas
 * @param {*} req 
 * @param {*} res 
 */
const setNewPassword = async (req, res) => {
  const result = newPass.validate(req.body);
  if (result.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: result.error.details },
    });
  } else {
    try {
      await userService.setNewPassword(result.value);
      res
        .status(200)
        .send({ status: 'OK', message: 'Change user password success' });
    } catch (error) {
      res.status(404).send({
        status: 'FAILED',
        data: { error: error?.message || error },
      });
    }
  }
};
/**
 * @brief sirve para encontrar un usuario por medio de correo electronico
 * @param {*} req 
 * @param {*} res 
 */
const findUserByEmail = async (req, res) => {
  const result = mailScheme.validate(req.body);
  if (result.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: result.error.details },
    });
  } else {
    try {
      const data = await userService.findUserByEmail(result.value);
      res.status(200).send({
        status: 'OK',
        data,
      });
    } catch (error) {
      res.status(404).send({
        status: 'FAILED',
        data: { error: error?.message || error },
      });
    }
  }
};

module.exports = {
  findUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
  setNewPassword,
  findUserByEmail,
};
