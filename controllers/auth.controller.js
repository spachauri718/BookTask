const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password, 8);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role
    });
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({ id: user.id, email: user.email, role: user.role, accessToken: token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
