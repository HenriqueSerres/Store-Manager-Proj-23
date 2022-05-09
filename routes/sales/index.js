const express = require('express');
const saleController = require('../../controllers/saleController');

const saleRouter = express.Router();

saleRouter.get('/sales', saleController.getAllSales);
saleRouter.get('/sales/:id', saleController.getSaleId);

module.exports = saleRouter;