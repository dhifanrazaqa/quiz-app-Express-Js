CREATE TABLE users (
  user_id VARCHAR(15) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  fullname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE quizzes (
  quiz_id VARCHAR(15) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  user_id VARCHAR(15) NOT NULL REFERENCES users(user_id)
);

CREATE TABLE questions (
  question_id VARCHAR(15) PRIMARY KEY,
  question_text TEXT NOT NULL,
  quiz_id VARCHAR(15) NOT NULL REFERENCES quizzes(quiz_id) ON DELETE CASCADE
);

CREATE TABLE answers (
  answer_id VARCHAR(15) PRIMARY KEY,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  question_id VARCHAR(15) NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE
);

CREATE TABLE session (
  sid VARCHAR PRIMARY KEY,
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
);

CREATE TABLE histories (
  history_id VARCHAR(15) PRIMARY KEY,
  score decimal NOT NULL,
  time TIMESTAMP NOT NULL DEFAULT NOW(),
  quiz_id VARCHAR(15) NOT NULL REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
  user_id VARCHAR(15) NOT NULL REFERENCES users(user_id)
);