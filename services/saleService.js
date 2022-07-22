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

const upDateSales = async (id, sale) => {
  const saleIdEdited = await saleModel.findSaleId(id);
  console.log(saleIdEdited);
  if (!saleIdEdited.length) {
    throw handleError('404', 'Sale not found');
  }
  await Promise.all(sale.map(({ productId, quantity }) => 
  saleModel.upDateSales(id, productId, quantity)));
  const editedSale = {
    saleId: saleIdEdited[0].id,
    itemUpdated: sale,
  }; 
  return editedSale;
};

const deleteSales = async (id) => {
  const saleId = await saleModel.getSaleId(id);
  if (saleId.length === 0) {
    throw handleError('404', 'Sale not found');
  }
  await saleModel.deleteSales(id);
  return { id };
};

module.exports = {
  getAllSales,
  getSaleId,
  addSales,
  upDateSales,
  deleteSales,
};