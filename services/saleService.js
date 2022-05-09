const saleModel = require('../models/saleModel');
const handleError = require('../utils/handleError');

const getAllSales = async () => {
  const allSales = await saleModel.getAllSales();

  return allSales;
};

const getSaleId = async (id) => {
  const saleId = await saleModel.getSaleId(id);
  if (!saleId) {
    throw handleError('400', 'Id não cadastrado');
  }
  return saleId;
};

module.exports = {
  getAllSales,
  getSaleId,
};