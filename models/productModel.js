const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const getProductId = async (id) => {
  const [result] = await connection.execute(`SELECT * FROM StoreManager.products 
  WHERE id = ?;`, [id]);
  return result[0];
};

const findProductName = async (name) => {
  const [result] = await connection.execute(`
  SELECT * FROM products WHERE name = ?
  `, [name]);
  return result;
};

const addProductByName = async (name, quantity) => {
  const [result] = await connection.execute(`
  INSERT INTO products (name, quantity) VALUES (?, ?)
  `, [name, quantity]);
  const newProduct = {
    id: result.insertId,
    name,
    quantity,
  };
  return newProduct;
};

const findProductId = async (id) => {
  const [result] = await connection.execute(`
  SELECT * FROM products WHERE id = ?
  `, [id]);
  console.log(result);
  return result;
};

const upDateProduct = async (id, name, quantity) => {
  const [result] = await connection.execute(`
  UPDATE products SET name = ?, quantity = ? WHERE id = ?
  `, [id, name, quantity]);
  console.log(result);
  const editProduct = {
    id,
    name,
    quantity,
  };
  return editProduct;
};

module.exports = {
  getAllProducts,
  getProductId,
  findProductName,
  addProductByName,
  findProductId,
  upDateProduct,
};