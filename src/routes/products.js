const express = require('express');
const ProductsController = require('../controllers/products');
const Product = require('../models/products');

const router =  express.Router();
const productsController = new ProductsController(Product);

router.get('/', (req, res) => productsController.get(req, res));
router.get('/:id', (req, res) => productsController.getById(req, res));

module.exports = router;
