const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');


// Getter for all products
router.get('/products', product.getProducts);

router.get('/categories', product.getCategories);

router.get('/products/:name', product.getProductByName);

router.get('/products/category/:categoryId', product.getProductsByCategory);


module.exports = router;