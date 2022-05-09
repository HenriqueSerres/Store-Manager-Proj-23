const express = require('express');
const saleController = require('../../controllers/saleController');

const saleRouter = express.Router();

saleRouter.get('/', saleController.getAllSales);
saleRouter.get('/:id', saleController.getSaleId);

module.exports = saleRouter;