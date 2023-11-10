const pool = require('../config/db');

const getHistoriesByUserId = async (userId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: `SELECT score, title FROM histories
      INNER JOIN quizzes
      ON quizzes.quiz_id = histories.quiz_id
      WHERE histories.user_id = $1 ORDER BY time`,
      values: [userId],
    };

    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

module.exports = {
  getHistoriesByUserId,
};
