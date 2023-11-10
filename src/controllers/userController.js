const nanoid = require('nanoid');
const bcrypt = require('bcrypt');
const { createUser, getUserByUsername } = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    const { username, fullname, password } = req.body;
    const userId = `user-${nanoid(10)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(userId, username, fullname, hashedPassword);

    return res.redirect('/users/login');
  } catch (error) {
    return res.render('registerPage', { error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);

    if (!user) {
      throw new Error('User tidak ditemukan');
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new Error('Password salah');
    }
    req.session.user = user.user_id;
    req.session.username = user.username;
    return res.redirect('/');
  } catch (error) {
    return res.render('loginPage', { error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    req.session.destroy();
    return res.redirect('/users/login');
  } catch (error) {
    return res.render('homePage');
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
