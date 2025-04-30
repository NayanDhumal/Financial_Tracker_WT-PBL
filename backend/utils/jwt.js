const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, "Nayan", { expiresIn: '1d' });
};
exports.verifyToken = token =>
  jwt.verify(token, "Nayan");

exports.generateToken = generateToken;
