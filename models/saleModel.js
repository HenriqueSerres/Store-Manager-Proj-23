const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(`
  SELECT s.id saleId, s.date, sp.product_id productId, sp.quantity
   FROM StoreManager.sales AS s
   JOIN StoreManager.sales_products AS sp
   ON s.id = sp.sale_id;
  `);
  return result;
};

const getSaleId = async (id) => {
  const result = await connection.execute(`
  SELECT s.date, sp.product_id productId, sp.quantity
   FROM StoreManager.sales AS s
   JOIN StoreManager.sales_products AS sp
   ON s.id = sp.sale_id
  WHERE id = ?;
  `, [id]);
  console.log(result);
  return result[0];
};

module.exports = {
  getAllSales,
  getSaleId,
};