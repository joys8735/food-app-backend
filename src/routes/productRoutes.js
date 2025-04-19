const express = require('express');
const router = express.Router();
const { Product, OptionGroup, OptionChoice } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const { categoryId, search } = req.query;
    const where = {};
    if (categoryId) where.categoryId = categoryId;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    const products = await Product.findAll({
      where,
      include: [{
        model: OptionGroup,
        as: 'options',
        required: false,
        include: [{ model: OptionChoice, as: 'choices', required: false }]
      }]
    });
    console.log('Products fetched:', products.length);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message, error.stack);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { id: ['featured1', 'featured2', 'featured3', 'featured4'] },
      include: [{
        model: OptionGroup,
        as: 'options',
        required: false,
        include: [{ model: OptionChoice, as: 'choices', required: false }]
      }]
    });
    console.log('Featured products fetched:', products.length);
    res.json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error.message, error.stack);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

router.get('/top', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { id: ['top1', 'top2'] },
      include: [{
        model: OptionGroup,
        as: 'options',
        required: false,
        include: [{ model: OptionChoice, as: 'choices', required: false }]
      }]
    });
    console.log('Top products fetched:', products.length);
    res.json(products);
  } catch (error) {
    console.error('Error fetching top products:', error.message, error.stack);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;