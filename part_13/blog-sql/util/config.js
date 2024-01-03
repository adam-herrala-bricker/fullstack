require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

const PORT = process.env.PORT || 3001;

const USER_SECRET = process.env.USER_SECRET;

module.exports = {
  DATABASE_URL,
  PORT,
  USER_SECRET
};
