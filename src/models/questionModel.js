const pool = require('../config/db');

const createQuestion = async (questionId, questionText, quizId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'INSERT INTO questions VALUES ($1, $2, $3) RETURNING question_id',
      values: [questionId, questionText, quizId],
    };

    const result = await client.query(query);
    return result.rows[0].id;
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
};

const getQuestionsByQuizId = async (quizId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'SELECT question_id, question_text FROM questions WHERE quiz_id = $1',
      values: [quizId],
    };

    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

module.exports = {
  createQuestion,
  getQuestionsByQuizId,
};
