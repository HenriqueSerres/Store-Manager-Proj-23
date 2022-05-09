const express = require('express');
const productController = require('../../controllers/productController');

const productRouter = express.Router();

productRouter.get('/products', productController.getAllProducts);
productRouter.get('/products/:id', productController.getProductId);

module.exports = productRouter;