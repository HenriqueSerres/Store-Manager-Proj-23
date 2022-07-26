const productService = require('../services/productService');

const getAllProducts = async (_req, res, next) => {
  try {
    const products = await productService.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    console.log('err list products', error.message);
    next(error);
  }
};

const getProductId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = await productService.getProductId(id);
    return res.status(200).json(productId);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addProductByName = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productService.addProductByName(name, quantity);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const upDateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const editProduct = await productService.upDateProduct(id, name, quantity);
    return res.status(200).json(editProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);
    return res.status(204).json(deletedProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductId,
  addProductByName,
  upDateProduct,
  deleteProduct,
};