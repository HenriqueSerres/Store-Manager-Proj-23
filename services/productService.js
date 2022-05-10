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

const upDateProduct = async (id, name, quantity) => {
  const productIdExist = await productModel.findProductId(id);
  if (!productIdExist.length) {
    throw handleError('404', 'Product not found');
  }
  const newProduct = await productModel.upDateProduct(id, name, quantity);
  return newProduct;
};

const deleteProduct = async (id) => {
  const delectedProduct = await productModel.deleteProduct(id);
  if (delectedProduct === 0) {
    throw handleError('404', 'Product not found');
  }
  return delectedProduct;
};

module.exports = {
  getAllProducts,
  getProductId,
  addProductByName,
  upDateProduct,
  deleteProduct,
};