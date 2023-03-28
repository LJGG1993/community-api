const joi = require('joi');
const loginService = require('../services/login-service');

const login = joi.object({
  mail: joi.string().email().required(),
  password: joi.string().required(),
});
/**
 * @brief para validar el inicio de sesión 
 * @param {*} req 
 * @param {*} res 
 */
const getData = async (req, res) => {
  const { body } = req;
  const result = login.validate(body);
  if (result.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: result.error.details },
    });
  } else {
    try {
      const data = await loginService.createLog(result.value);
      res.header('auth-token', data.accessToken).status(200).send({
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
  getData,
};
