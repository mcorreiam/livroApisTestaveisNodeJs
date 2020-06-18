const express = require('express');
const ProductsController = require('../controllers/products');

const router =  express.Router();
const productsController = new ProductsController();

router.get('/', (req, res) => productsController.get(req, res));

module.exports = router;
