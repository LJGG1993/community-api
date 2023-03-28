/**
 * @brief const connect es para crear la coneccion con la db (backend).
 */
const connect = require('../connection/dbconnection');
/**
 * @brief const findCompanies es para encontrar alguna compañia que el usuario necesite.
 * @returns 
 */
const findCompanies = async () => {
  try {
    const connection = await connect();
    const [data] = await connection.query('SELECT * FROM company');
    return data;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief const findOneCompany es para encontrar una compañia que el usuario busque.
 * @param {*} companyId 
 * @returns 
 */
const findOneCompany = async (companyId) => {
  try {
    const connection = await connect();
    const [data] = await connection.query(
      'SELECT * FROM company WHERE company = ?',
      [companyId]
    );
    if (data.length === 0) {
      throw {
        status: 400,
        message: `ID not found: ${companyId}`,
      };
    }
    return data;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief const createNewCompany es para crear una nueva compañia.
 * @param {*} newCompany 
 * @returns 
 */
const createNewCompany = async (newCompany) => {
  try {
    const connection = await connect();
    return connection.query(
      'INSERT INTO company (name, location, description, web, contact) VALUES (?,?,?,?,?)',
      [
        newCompany.name,
        newCompany.location,
        newCompany.description,
        newCompany.web,
        newCompany.contact,
      ]
    );
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief const updateCompany es para actualizar algun dato de la compañia.
 * @param {*} objectCompany 
 * @param {*} companyId 
 * @returns 
 */
const updateCompany = async (objectCompany, companyId) => {
  try {
    await findOneCompany(companyId);
    const connection = await connect();
    const [result] = await connection.query(
      'UPDATE company SET ? WHERE company = ?',
      [objectCompany, companyId]
    );
    return result;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief deleteCompany es para eliminar alguna compañia propia que el usuario desee.
 * @param {*} companyId 
 */
const deleteCompany = async (companyId) => {
  try {
    const connection = await connect();
    const data = await connection.query(
      'DELETE FROM company WHERE company = ?',
      [companyId]
    );
    if (data[0].affectedRows === 0) {
      throw {
        status: 400,
        message: `ID not found: ${companyId}`,
      };
    }
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  findCompanies,
  findOneCompany,
  createNewCompany,
  updateCompany,
  deleteCompany,
};
