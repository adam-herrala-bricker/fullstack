// this is just so all the models can be imported at once
const Blog = require('./blog');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User); // this automatically creates the "userId" attribute for Blog

Blog.sync({alter: true});
User.sync({alter: true});

module.exports = {Blog, User};
