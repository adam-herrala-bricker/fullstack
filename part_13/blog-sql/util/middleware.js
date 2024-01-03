const jwt = require('jsonwebtoken');
const {USER_SECRET} = require('./config');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), USER_SECRET);
    } catch {
      return res.status(401).json({error: 'invalid token'});
    }
  } else {
    return res.status(401).json({error: 'token missing'});
  }

  next()
};

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({error: error.message});
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({error: "entry must be unique"});
  }else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({error: error.message});
  } else if (error.message === 'entry not found') {
    return response.status(404).json({error: error.message});
  }

  next(error);
};

module.exports = {errorHandler, tokenExtractor};
