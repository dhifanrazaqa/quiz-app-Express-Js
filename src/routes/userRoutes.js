const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('registerPage', { error: '' });
});
router.post('/register', registerUser);

router.get('/login', (req, res) => {
  res.render('loginPage', { error: '' });
});
router.post('/login', loginUser);

router.get('/logout', logoutUser);

module.exports = router;
