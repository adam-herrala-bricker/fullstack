const jwt = require('jsonwebtoken');
const {ActiveSession} = require('../models');
const {USER_SECRET} = require('./config');

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const encodedToken = authorization.substring(7);
    try {
      const decodedToken = jwt.verify(encodedToken, USER_SECRET);

      // check that this is an active token for the given user
      const userSessions = await ActiveSession.findAll({
        attributes: ['token', 'userId'],
        where: {
          userId: decodedToken.id
        }
      });
      const userTokens = userSessions.map(i => i.token);
      if (!userTokens.includes(encodedToken)) {
        return res.status(403).json({error: 'expired token'});
      }

      req.decodedToken = decodedToken
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
