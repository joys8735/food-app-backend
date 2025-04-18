const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/featured', productController.getFeaturedProducts);
router.get('/top', productController.getTopProducts);

module.exports = router;