const pool = require('../config/db');

const createAnswer = async (answerId, answerText, isCorrect, questionId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'INSERT INTO answers VALUES ($1, $2, $3, $4) RETURNING answer_id',
      values: [answerId, answerText, isCorrect, questionId],
    };

    const result = await client.query(query);
    return result.rows[0].id;
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
};

const getAnswersByQuestionId = async (questionId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'SELECT answer_id, answer_text FROM answers WHERE question_id = $1',
      values: [questionId],
    };

    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

const getAnswersByQuizId = async (quizId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: `SELECT questions.question_id, answer_text, is_correct
      FROM questions
      INNER JOIN answers
      ON questions.question_id = answers.question_id
      WHERE quiz_id = $1`,
      values: [quizId],
    };

    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

module.exports = {
  createAnswer,
  getAnswersByQuizId,
  getAnswersByQuestionId,
};
