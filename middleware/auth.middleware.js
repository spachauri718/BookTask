const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({ message: 'No token provided!' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized!' });
      }
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  },
  isSeller: (req, res, next) => {
    if (req.userRole !== 'seller') {
      return res.status(403).send({ message: 'Require Seller Role!' });
    }
    next();
    console.log("seller role is detected");
  }
};

module.exports = authMiddleware;
