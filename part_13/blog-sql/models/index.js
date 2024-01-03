// this is just so all the models can be imported at once
const Blog = require('./blog');
const User = require('./user');

Blog.belongsTo(User); // this automatically creates the "userId" attribute for Blog
User.hasMany(Blog);

// no syncing now that we're handling this with migrations
// Blog.sync({alter: true});
// User.sync({alter: true});

module.exports = {Blog, User};
