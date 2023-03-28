/**
 * @brief const userRepository es para mandar llamar otro archivo a esta ruta.
 */
const userRepository = require('../repositories/user-repository');
const mailRepository = require('../repositories/token-repository');
/**
 * @breif const findUsers es para pasar los datos de esta variable a userRepository.findUsers
 * @returns 
 */
const findUsers = async () => userRepository.findUsers();
/**
 * @brief const findOneUser es para pasar los datos de esta variable a userRepository.findOneUser
 * @returns 
 */
const findOneUser = async (userId) => userRepository.findOneUser(userId);
/**
 * @brief createNewUser es para pasar los datos de esta variable a  userRepository.createNewUser
 * @param {*} newUser 
 * @returns 
 */
const createNewUser = async (newUser) => userRepository.updateUser(newUser);
/**
 * @breif updateUser es para pasar los datos de esta variable a  userRepository.createNewUser
 * @param {*} objectUser 
 * @param {*} userId 
 * @returns 
 */
const updateUser = async (objectUser, userId) =>
  userRepository.updateUser(objectUser, userId);
/**
 * @breif deleteUser  es para pasar los datos de esta variable a  userRepository.deleteUser
 * @param {*} userId 
 * @returns 
 */
const deleteUser = async (userId) => userRepository.deleteUser(userId);
/**
 * @brief const setNewPassword es para pasar los datos de esta variable a  const { fk_user_id }
 * @param {*} param0 
 * @returns 
 */
const setNewPassword = async ({ uuid, password }) => {
  try {
    const { fk_user_id } = await mailRepository.findToken(uuid);
    return await userRepository.setPassword(fk_user_id, password);
  } catch (error) {
    throw error;
  }
};
/**
 * @brief const findUserByEmail es para buscar un usuario por email.
 * @param {*} param0 
 * @returns 
 */
const findUserByEmail = async ({ mail }) =>
  userRepository.findUserByEmail(mail);

module.exports = {
  findUsers,
  findOneUser,
  createNewUser,
  updateUser,
  deleteUser,
  setNewPassword,
  findUserByEmail,
};
