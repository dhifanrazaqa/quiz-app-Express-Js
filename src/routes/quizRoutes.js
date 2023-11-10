const express = require('express');
const {
  detailQuiz, deleteQuiz, evaluateQuiz, addQuiz,
} = require('../controllers/quizController');

const router = express.Router();

router.get('/add', (req, res) => {
  res.render('addQuizPage', { req });
});
router.get('/:id', detailQuiz);
router.post('/:id/submit', evaluateQuiz);
router.post('/:id/delete', deleteQuiz);
router.post('/add', addQuiz);

module.exports = router;
