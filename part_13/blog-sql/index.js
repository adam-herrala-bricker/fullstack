const express = require('express');
require('express-async-errors');
const app = express();

const {PORT} = require('./util/config');
const {connectToDB} = require('./util/db');
const middleware = require('./util/middleware');

const blogRouter = require('./controllers/blogs');


app.use(express.json()); // don't forget this or req bodies won't work!!
app.use('/api/blogs', blogRouter);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDB();
  // listen on PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
