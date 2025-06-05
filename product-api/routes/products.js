const express = require('express');
const { v4: uuidv4 } = require('uuid');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { validateProduct } = require('../middleware/validation');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products - List all products with optional filtering and pagination
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) {
      query.category = { $regex: new RegExp(category, 'i') }; // case-insensitive
    }
    console.log('Query:', query); // Debug line

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: products,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/search - Search products by name
router.get('/search', async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      throw new ValidationError('Search term is required');
    }

    const products = await Product.find({
      name: { $regex: new RegExp(name, 'i') }, // case-insensitive search
    });

    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/stats - Return product counts by category
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedStats = {};
    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.json(formattedStats);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id - Get a product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError('Product', req.params.id);
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products - Create a new product
router.post('/', validateProduct, async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id - Update a product by ID
router.put('/:id', validateProduct, async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new NotFoundError('Product', req.params.id);
    }

    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id - Delete a product by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      throw new NotFoundError('Product', req.params.id);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
