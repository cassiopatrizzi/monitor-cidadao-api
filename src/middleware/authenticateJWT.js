const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'monitorcidadao_secret';

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  const token = authHeader.replace('Bearer ', '');
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
