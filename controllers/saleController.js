const saleService = require('../services/saleService');

const getAllSales = async (req, res, next) => {
  try {
    const sales = await saleService.getAllSales();

    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSaleId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleId = await saleService.getSaleId(id);
    return res.status(200).json(saleId);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllSales,
  getSaleId,
};