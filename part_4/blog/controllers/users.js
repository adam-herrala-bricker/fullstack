const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//POST request to create new user
usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    //mystery juice
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

//GET request to return list of all users
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter