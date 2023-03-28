const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');

const cryptr = new Cryptr(process.env.SECRET_CRYPTR);
const userRepository = require('../repositories/user-repository');

const { SECRET_KEY } = process.env;
/**
 * @brief sirve para validar el inicio de sesion 
 * @param {*} param0 
 * @returns 
 */
const createLog = async ({ mail, password }) => {
  try {
    const user = await userRepository.findUserByEmail(mail);
    const pass = cryptr.decrypt(user.password);
    if (pass === password) {
      const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: '2h',
      });
      const dataUser = {
        id: user.id,
        name: user.name,
        accessToken,
      };
      return dataUser;
    }
    throw {
      status: 404,
      message: 'Mail or password wrong',
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createLog,
};
