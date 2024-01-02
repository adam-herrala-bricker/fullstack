require('dotenv').config();
const {Sequelize, DataTypes, Model} = require('sequelize');
const express = require('express');
const app = express();
app.use(express.json()); // don't forget this or req bodies won't work!!

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false // default logging is cluttering and can get fucked
});

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

Blog.sync(); // this creates the model if it's not there already

// GET request for all blogs
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

// POST request for new blog
app.post('/api/blogs', async (req, res) => {
  console.log(req.body);
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch(error) {
    return res.status(400).json({error});
  }
});

// DELETE request to remove a blog
app.delete('/api/blogs/:id', async (req, res) => {
  const thisID = req.params.id;
  // check to make sure it's in there
  const thisBlog = await Blog.findOne({where: {id: thisID}});
  if (!thisBlog) {
    return res.status(404).json({error: 'entry not found'});
  }

  try {
    await Blog.destroy({where: {id: thisID}})
    return res.status(204).end();
  } catch(error) {
    return res.status(400).json({error});
  }
});


// listen on PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});