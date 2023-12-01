//note: added stuff from the exercises too
let { mongourl, PORT, NODE_ENV, MONGO_DOCKER_URL } = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blog");
const blogsRouter2 = require("./controllers/blog2");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// if you give it MONGO_DOCKER_URL, it doesn't use the external one
if (MONGO_DOCKER_URL) {
  console.log('Mongo docker url:', MONGO_DOCKER_URL)
  mongourl = MONGO_DOCKER_URL
} else {
  console.log('No url for containerized Mongo DB found.')
};

logger.info("connecting to", mongourl);

mongoose
  .connect(mongourl)
  .then(() => {
    logger.info("connected to MongoDB!");
  })
  .catch((error) => {
    logger.error(`error connecting to MongoDB: ${error.message}`);
  });



app.use(cors());
app.use(express.json());
app.use(express.static('../blog-refactor-frontend/dist'));
/* would put custom middleware here, e.g.:
app.use(middleWare.requestLogger)
*/

app.use(middleware.userExtractor); //this must go before the routers!!!!

app.use("/api/blogs", blogsRouter);
app.use("/blogs/api/blogs", blogsRouter2)
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

//if testing --> testing router to reset testing DB
if (NODE_ENV === "testing") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

//then custom error handling MW that goes at end goes here
app.use(middleware.errorHandler);

module.exports = app;
