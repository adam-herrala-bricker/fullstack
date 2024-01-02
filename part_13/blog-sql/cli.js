require('dotenv').config();
const {Sequelize, DataTypes, Model} = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);

// this matches the schemea we defined on the command line
// (it doesn't define the schema)
class Blog extends Model {};

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  author: {
    type: DataTypes.TEXT
  },

  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog' 
});


const main = async () => {
  try {
    const blogs = await Blog.findAll();
    console.log(blogs);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();