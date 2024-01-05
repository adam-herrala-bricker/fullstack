const express = require('express');
require('express-async-errors');
const app = express();

const {PORT} = require('./util/config');
const {connectToDB} = require('./util/db');
const middleware = require('./util/middleware');

const adminRouter = require('./controllers/admin');
const authorRouter = require('./controllers/authors');
const blogRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const readingsRouter = require('./controllers/readingList');
const userRouter = require('./controllers/users');

app.use(express.json()); // don't forget this or req bodies won't work!!

app.use('/api/admin', adminRouter);
app.use('/api/authors', authorRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/login', loginRouter);
app.use('/api/readings', readingsRouter);
app.use('/api/users', userRouter);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDB();
  // listen on PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
