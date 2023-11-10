/* eslint-disable no-await-in-loop */
const nanoid = require('nanoid');
const {
  getAllQuiz, getQuizById, createQuiz, createHistory, deleteQuizById,
} = require('../models/quizModel');
const { getQuestionsByQuizId, createQuestion } = require('../models/questionModel');
const { getAnswersByQuestionId, getAnswersByQuizId, createAnswer } = require('../models/answerModel');
const { getHistoriesByUserId } = require('../models/historyModel');

const homeQuiz = async (req, res) => {
  const data = await getAllQuiz();

  return res.render('homePage', { data, req });
};

const historyPage = async (req, res) => {
  const data = await getHistoriesByUserId(req.session.user);

  return res.render('historiesPage', { data, req });
};

const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  await deleteQuizById(id);

  return res.redirect('/');
};

const detailQuiz = async (req, res) => {
  const { id } = req.params;

  const quiz = await getQuizById(id);
  const questions = await getQuestionsByQuizId(id);

  const data = await Promise.all(questions.map(async (question) => ({
    ...question,
    answers: await getAnswersByQuestionId(question.question_id),
  })));

  return res.render('detailPage', { quiz, data, req });
};

const evaluateQuiz = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const historyId = `hist-${nanoid(10)}`;

  const quiz = await getQuizById(id);
  const answers = await getAnswersByQuizId(id);
  let nilai = 0;
  const keys = Object.keys(data);

  keys.forEach((key) => {
    const jawaban = answers.filter(
      (item) => item.question_id === key && item.answer_text === data[key],
    );
    if (jawaban[0].is_correct) nilai += 1;
  });

  nilai = (nilai / keys.length) * 100;

  await createHistory(historyId, nilai, id, req.session.user);

  res.render('resultPage', { nilai, quiz, req });
};

const addQuiz = async (req, res) => {
  const data = req.body;
  const quizTitle = req.body['quiz-title'];
  const quizId = `quiz-${nanoid(10)}`;
  let questionId = '';
  let answerId = '';
  await createQuiz(quizId, quizTitle, req.session.user);

  const keys = Object.keys(data);

  for (let index = 0; index < keys.length; index += 1) {
    if (keys[index].includes('question')) {
      questionId = `ques-${nanoid(10)}`;
      await createQuestion(questionId, data[keys[index]], quizId);
    }
    if (keys[index].includes('answer')) {
      answerId = `answ-${nanoid(10)}`;
      if (index + 1 < keys.length && keys[index + 1].includes('correct')) {
        await createAnswer(answerId, data[keys[index]], true, questionId);
      } else {
        await createAnswer(answerId, data[keys[index]], false, questionId);
      }
    }
  }

  return res.redirect('/');
};

module.exports = {
  homeQuiz,
  detailQuiz,
  deleteQuiz,
  evaluateQuiz,
  addQuiz,
  historyPage,
};
