// this is just so all the models can be imported at once
const Blog = require('./blog');
const ReadingList = require('./readingList');
const User = require('./user');

Blog.belongsTo(User); // this automatically creates the "userId" attribute for Blog
User.hasMany(Blog);

Blog.belongsToMany(User, {through: ReadingList, as: 'user_list'});
User.belongsToMany(Blog, {through: ReadingList, as: 'marked_readings'});

// no syncing now that we're handling this with migrations
// Blog.sync({alter: true});
// User.sync({alter: true});

module.exports = {Blog, ReadingList, User};
