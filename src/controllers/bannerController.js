const Banner = require('../models/Banner');

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.json(banners);
  } catch (err) {
    console.error('Error fetching banners:', err);
    res.status(500).json({ message: 'Server error' });
  }
};