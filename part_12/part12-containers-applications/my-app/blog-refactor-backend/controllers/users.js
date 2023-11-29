const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

//POST request to create new user
usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (!password) {
    response.status(400).json({ error: "password required" });
  } else if (password.length < 3) {
    response
      .status(400)
      .json({ error: "password must be at least 3 characters long!" });
  } else {
    //mystery juice
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);

    next();
  }
});

//GET request to return list of all users
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  }); //"populate" is so nifty wow
  response.json(users);
});

module.exports = usersRouter;
