const express = require('express');
const sessions = require('express-session');
const path = require('path');
const routes = require('./routes');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
const port = 5000;
const staticDirectory = path.join(__dirname, './public');

app.use(express.static(staticDirectory));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessions({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  store: new (require('connect-pg-simple')(sessions))({
    conString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  }),
}));

app.use('', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
