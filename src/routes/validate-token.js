/**
 * @brief  Da acceso a la ruta
 * @returns 
 */
const jwt = require('jsonwebtoken');
/**
 * @brief Valida las rutas protegidas
 * @returns 
 */
// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
  if (
    (req.method === 'POST' &&
      (req.url === '/users' ||
        req.url === '/users/new-password' ||
        req.url === '/events')) ||
    (req.method === 'GET' && req.url === '/events')
  ) {
    next();
  } else {
    /**
 * @brief No da acceso si hay errores
 * @returns 
 */
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ msg: 'Acceso denegado' });
    try {
      /**
 * @brief Veriifica que el token sea correcto
 * @returns 
 */
      const verified = jwt.verify(token, process.env.SECRET_KEY);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ msg: 'token no es válido', error });
    }
  }
};

module.exports = verifyToken;
