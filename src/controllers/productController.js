const Product = require('../models/Product');

exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { id: ['featured1', 'featured2', 'featured3', 'featured4'] },
    });
    res.json(products);
  } catch (err) {
    console.error('Error fetching featured products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { id: ['top1', 'top2'] },
    });
    res.json(products);
  } catch (err) {
    console.error('Error fetching top products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};