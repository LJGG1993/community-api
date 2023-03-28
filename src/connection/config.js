/**
 * @bref La propiedad process.env devuelve un objeto que contiene el entorno del usuario.
 */
const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

module.exports = config;
