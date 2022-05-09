const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.query('SELECT * FROM StoreManager.sales');
  connection.query();
  connection.execute();
  return result;
};

const getSaleId = async (id) => {
  const [result] = await connection.execute(`SELECT * FROM StoreManager.sales 
  WHERE id = ?;`, [id]);
  return result;
};

module.exports = {
  getAllSales,
  getSaleId,
};