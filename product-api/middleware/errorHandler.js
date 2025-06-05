const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error caught:', err);

  if (err.name === 'ValidationError') {
    return res.status(err.statusCode || 400).json({
      error: {
        message: err.message,
        details: err.details || err.errors || undefined
      }
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(err.statusCode || 404).json({
      error: {
        message: err.message
      }
    });
  }

  // Mongoose cast errors (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: {
        message: `Invalid ${err.path}: ${err.value}`
      }
    });
  }

  // Default fallback
  res.status(err.status || 500).json({
    error: {
      message:
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : err.message || 'Unexpected error'
    }
  });
};

module.exports = { errorHandler };
