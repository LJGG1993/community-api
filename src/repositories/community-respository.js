/**
 * @brief const es para asignar la coneccion con la db.
 */
const connect = require('../connection/dbconnection');

const findCommunities = async () => {
  try {
    const connection = await connect();
    const [data] = await connection.query('SELECT * FROM community');
    return data;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief const findOneCommunity es para encontrar una communidad que el usuario busque buscando.
 * @param {*} communityId 
 * @returns 
 */
const findOneCommunity = async (communityId) => {
  try {
    const connection = await connect();
    const [data] = await connection.query(
      'SELECT * FROM community WHERE community = ?',
      [communityId]
     );
    if (data.length === 0) {
      throw {
        status: 400,
        message: `ID not found: ${communityId}`,
      };
    }
    return data;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief const createNewCommunity es para que el usuario pueda insertar una comunidad nueva (backend).
 * @param {*} newCommunity 
 * @returns 
 */
const createNewCommunity = async (newCommunity) => {
  try {
    const connection = await connect();
    return connection.query(
      'INSERT INTO community (name, description) VALUES (?,?)',
      [newCommunity.name, newCommunity.description]
    );
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief const updateCommunity se usa para poner mas informacion de una communidad.
 * @param {*} objectCommunity 
 * @param {*} communityId 
 * @returns 
 */
const updateCommunity = async (objectCommunity, communityId) => {
  try {
    await findOneCommunity(communityId);
    const connection = await connect();
    const [result] = await connection.query(
      'UPDATE community SET ? WHERE community = ?',
      [objectCommunity, communityId]
    );
    return result;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief const deleteCommunity es para eliminar una communidad o datos de ella.
 * @param {*} communityId 
 */
const deleteCommunity = async (communityId) => {
  try {
    const connection = await connect();
    const data = await connection.query(
      'DELETE FROM community WHERE community = ?',
      [communityId]
    );
    if (data[0].affectedRows === 0) {
      throw {
        status: 400,
        message: `ID not found: ${communityId}`,
      };
    }
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  findCommunities,
  findOneCommunity,
  createNewCommunity,
  updateCommunity,
  deleteCommunity,
};
