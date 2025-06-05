const ValidationError = require('../errors/ValidationError');

const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string') {
    errors.push('Name is required and must be a string');
  }

  if (price === undefined || typeof price !== 'number' || isNaN(price) || price <= 0) {
    errors.push('Price is required and must be a positive number');
  }

  if (!category || typeof category !== 'string') {
    errors.push('Category is required and must be a string');
  }

  if (errors.length > 0) {
    throw new ValidationError('Validation failed', errors);
  }

  next();
};

module.exports = {
  validateProduct
};
