const express = require('express');
const userRoutes = require('./userRoutes');
const quizRoutes = require('./quizRoutes');
const { homeQuiz, historyPage } = require('../controllers/quizController');

const router = express.Router();

router.get('', homeQuiz);
router.get('/history', historyPage);
router.use('/users', userRoutes);
router.use('/quiz', quizRoutes);

module.exports = router;
