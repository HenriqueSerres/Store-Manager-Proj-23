const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.query('SELECT * FROM StoreManager.products');
  connection.query();
  connection.execute();
  return result;
};

const getProductId = async (id) => {
  const [result] = await connection.execute(`SELECT * FROM StoreManager.products 
  WHERE id = ?;`, [id]);
  return result;
};

module.exports = {
  getAllProducts,
  getProductId,
};