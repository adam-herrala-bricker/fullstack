// this initializes (connection to?) the DB
const Sequelize = require('sequelize');
const {DATABASE_URL} = require('./config');

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false // default logging is cluttering and can get fucked
});

// this just verifies the connection is working?
const connectToDB = async () => {
  try {
    console.log('connecting to:', DATABASE_URL);
    await sequelize.authenticate();
    console.log('connected to DB!');
  } catch(error) {
    console.log('false to connect to the database');
    return process.exit(1);
  }

  return null
}

module.exports = {connectToDB, sequelize}; // I believe you export sequelize from here bc the whole app needs to use the same one?
