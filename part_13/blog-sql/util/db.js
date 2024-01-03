// this initializes (connection to?) the DB
const Sequelize = require('sequelize');
const {DATABASE_URL} = require('./config');
const {Umzug, SequelizeStorage} = require('umzug');

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false // default logging is cluttering and can get fucked
});

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js'
  },
  storage: new SequelizeStorage({sequelize, tableName: 'migrations'}),
  context: sequelize.getQueryInterface(),
  logger:console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);

  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
};

const rollbackMigrations = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
}


// this just verifies the connection is working?
const connectToDB = async () => {
  try {
    console.log('connecting to:', DATABASE_URL);
    await sequelize.authenticate();
    await runMigrations();
    console.log('connected to DB!');
  } catch(error) {
    console.log('false to connect to the database');
    return process.exit(1);
  }

  return null
}

module.exports = {connectToDB, sequelize, rollbackMigrations}; // I believe you export sequelize from here bc the whole app needs to use the same one?
