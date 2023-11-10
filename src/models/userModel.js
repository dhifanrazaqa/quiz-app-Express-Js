const pool = require('../config/db');

const createUser = async (userId, username, fullname, password) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING user_id',
      values: [userId, username, fullname, password],
    };

    const result = await client.query(query);
    return result.rows[0].id;
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
};

const getUserById = async (userId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'SELECT * FROM users WHERE user_id = $1',
      values: [userId],
    };

    const result = await client.query(query);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const getUserByUsername = async (username) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };

    const result = await client.query(query);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateUser = async (userId, username, fullname) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'UPDATE users SET username = $2, fullname = $3 WHERE user_id = $1',
      values: [userId, username, fullname],
    };

    await client.query(query);
  } finally {
    client.release();
  }
};

const deleteUser = async (userId) => {
  const client = await pool.connect();
  try {
    const query = {
      text: 'DELETE FROM users WHERE user_id = $1',
      values: [userId],
    };

    await client.query(query);
  } finally {
    client.release();
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
};
