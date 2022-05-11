const express = require('express');
const saleController = require('../../controllers/saleController');
const validateSale = require('../../middlewares/saleIsValid');

const saleRouter = express.Router();

saleRouter.get('/', saleController.getAllSales);
saleRouter.post('/', validateSale, saleController.addSales);
saleRouter.get('/:id', saleController.getSaleId);
saleRouter.put('/:id', validateSale, saleController.upDateSales);

module.exports = saleRouter;