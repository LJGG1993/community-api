/**
 * @brief const connect es para crear la coneccion con la db.
 */
const connect = require('../connection/dbconnection');
/**
 * @brief const create es para crear un token a el usuario.
 * @param {*} id 
 * @param {*} uuid 
 * @returns 
 */
const createToken = async (id, uuid) => {
  try {
    const connection = await connect();
    return connection.query(
      'INSERT INTO token (fk_user_id, uuid) VALUES (?,?)',
      [id, uuid]
    );
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief const findToken es para buscar un token de usuario o a un usuario por token.
 * @param {*} uuid 
 * @returns 
 */
const findToken = async (uuid) => {
  try {
    const connection = await connect();
    const [data] = await connection.query(
      'SELECT * FROM token WHERE uuid = ?',
      [uuid]
    );
    if (data.length === 0) {
      throw {
        status: 404,
        message: 'UUID not found',
      };
    }
    return data[0];
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  createToken,
  findToken,
};
