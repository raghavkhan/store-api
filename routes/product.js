const express = require('express');
const router = express.Router();

const {
  getAllProductsStatic,
  getAllProducts,
} = require('../controllers/products');

// router.get('/api/v1/products', getAllProductsStatic);
router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);

module.exports = router;
