const productModel = require('../models/productModel');
const handleError = require('../utils/handleError');

const getAllProducts = async () => {
  const allProducts = await productModel.getAllProducts();
  
  return allProducts;
};

const getProductId = async (id) => {
  const productId = await productModel.getProductId(id);
  if (!productId) {
    throw handleError('404', 'Product not found');
  }
  return productId;
};

module.exports = {
  getAllProducts,
  getProductId,
};