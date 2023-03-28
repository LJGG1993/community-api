const mysql = require('mysql2/promise');
// const config = require('../connection/config');
/**
 * @bref esta funcion sirve para conectar a la base de datos 
 * @returns 
 */
function connect() {
  return mysql.createConnection(process.env.DATABASE_URL);
}

module.exports = connect;
