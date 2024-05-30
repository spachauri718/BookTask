const db = require('../models');
const User = db.User;

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const { name, email } = req.body;
    await user.update({ name, email });
    res.status(200).send({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    await user.destroy();
    res.status(200).send({ message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
