const pool = require('../config/db');

const createQuiz = async (quizId, title, userId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'INSERT INTO quizzes VALUES ($1, $2, $3) RETURNING quiz_id',
      values: [quizId, title, userId],
    };

    const result = await client.query(query);
    return result.rows[0].id;
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
};

const createHistory = async (historyId, score, quizId, userId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'INSERT INTO histories VALUES ($1, $2, $3, $4) RETURNING history_id',
      values: [historyId, score, quizId, userId],
    };

    const result = await client.query(query);
    return result.rows[0].id;
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
};

const getAllQuiz = async () => {
  const client = await pool.connect();
  try {
    const query = `SELECT quiz_id, title, username
    FROM quizzes INNER JOIN users
    ON quizzes.user_id = users.user_id`;

    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

const getQuizById = async (quizId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'SELECT * FROM quizzes WHERE quiz_id = $1',
      values: [quizId],
    };

    const result = await client.query(query);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateQuizById = async (quizId, title) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'UPDATE quizzes SET title = $2 WHERE quiz_id = $1',
      values: [quizId, title],
    };

    await client.query(query);
  } finally {
    client.release();
  }
};

const deleteQuizById = async (quizId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'DELETE FROM quizzes WHERE quiz_id = $1',
      values: [quizId],
    };

    await client.query(query);
  } finally {
    client.release();
  }
};

module.exports = {
  createQuiz,
  createHistory,
  getAllQuiz,
  getQuizById,
  updateQuizById,
  deleteQuizById,
};
