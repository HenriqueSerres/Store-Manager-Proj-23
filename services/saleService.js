const saleModel = require('../models/saleModel');
const handleError = require('../utils/handleError');

const getAllSales = async () => {
  const allSales = await saleModel.getAllSales();
  
  return allSales;
};

const getSaleId = async (id) => {
  const saleId = await saleModel.getSaleId(id);
  if (saleId.length === 0) {
    throw handleError('404', 'Sale not found');
  }
  return saleId;
};

const addSales = async (sale) => {  
  const newSaleId = await saleModel.getNewSaleId();
  await Promise.all(sale.map(({ productId, quantity }) => 
  saleModel.addSales(newSaleId, productId, quantity)));
  console.log(sale); 
  const newSale = {
    id: newSaleId,
    itemsSold: sale,
  }; 
  return newSale;
};

module.exports = {
  getAllSales,
  getSaleId,
  addSales,
};