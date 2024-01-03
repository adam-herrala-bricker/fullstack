// this is just so all the models can be imported at once
const Blog = require('./blog');
const User = require('./user');

Blog.sync();
User.sync();

module.exports = {Blog, User};
