const express = require('express');
const productController = require('../../controllers/productController');
const validateProduct = require('../../middlewares/productIsValid');

const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);
productRouter.post('/', validateProduct, productController.addProductByName);
productRouter.get('/:id', productController.getProductId);

module.exports = productRouter;