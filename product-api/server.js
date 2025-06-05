require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const { errorHandler } = require('./middleware/errorHandler');

// Routes
const productsRouter = require('./routes/products');

// Built-in middleware
app.use(express.json());

// Custom middleware
app.use(logger);

// Public route (health check)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Authentication middleware (after public routes)
app.use(auth);

// API routes
app.use('/api/products', productsRouter);

// 404 handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

module.exports = app;
