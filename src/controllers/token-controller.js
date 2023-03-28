const joi = require('joi');
const tokenService = require('../services/token-service');

const token = joi.object({
  mail: joi.string().email().max(100).required(),
});
/**
 * @brief sirve para comunicarte con la empresa y enviar un correo
 * @param {*} req 
 * @param {*} res 
 */
const sendTokentoMail = async (req, res) => {
  const { error } = token.validate(req.body);
  if (error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: error.details },
    });
  } else {
    try {
      await tokenService.sendTokentoMail(req.body.mail);
      res.status(202).send({ status: 'OK', message: 'Mail send' });
    } catch (err) {
      res.status(404).send({
        status: 'FAILED',
        data: { error: err?.message || err },
      });
    }
  }
};

module.exports = {
  sendTokentoMail,
};
