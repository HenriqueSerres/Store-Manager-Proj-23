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

const addProductByName = async (name, quantity) => {
  const productExist = await productModel.findProductName(name);
  if (productExist.length === 0) {
    const newProduct = await productModel.addProductByName(name, quantity);
    return newProduct;
  }
  throw handleError('409', 'Product already exists');
};

module.exports = {
  getAllProducts,
  getProductId,
  addProductByName,
};