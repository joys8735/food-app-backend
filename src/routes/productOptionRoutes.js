const express = require('express');
const router = express.Router();
const { ProductOption } = require('../models');

router.get('/', async (req, res) => {
  try {
    const { productId } = req.query;
    const where = productId ? { productId } : {};
    const options = await ProductOption.findAll({ where });
    res.json(options);
  } catch (error) {
    console.error('Error fetching product options:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;