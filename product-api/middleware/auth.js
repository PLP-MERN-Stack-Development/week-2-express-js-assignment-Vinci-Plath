const ValidationError = require('../errors/ValidationError');

const authenticate = (req, res, next) => {
  const apiKey = req.get('x-api-key');
  
  if (!apiKey) {
    throw new ValidationError('API key is required');
  }

  if (apiKey !== process.env.API_KEY) {
    throw new ValidationError('Unauthorized: Invalid API key');
  }

  next();
};

module.exports = authenticate;
