const logger = require('./logger')

//for use with blog router
const tokenExtractor = (request, response, next) => {

    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) { //watch out! at places in fullstack its "bearer" in lowercase
        request.token = authorization.replace('Bearer ', '')
    }
    

    next()
}

const errorHandler = (error, requre, response, next) => { //something's going on here; figure out
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: error.message })
    }
    
    next(error)
}

module.exports = {errorHandler, tokenExtractor}