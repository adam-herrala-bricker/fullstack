// this is just so all the models can be imported at once
const Blog = require('./blog');

Blog.sync();

module.exports = {Blog};
