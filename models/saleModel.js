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

const getNewSaleId = async () => {
  const [{ insertId: id }] = await connection.execute(`
  INSERT INTO sales (date) VALUES (now())
  `);
  return id;
};

const addSales = async (sale) => {  
  const productSold = await connection.execute(`
  INSERT INTO sales_products VALUES (?, ?, ?)
  `, [sale.saleId, sale.productId, sale.quantity]);
  return productSold;
};

module.exports = {
  getAllSales,
  getSaleId,
  addSales,
  getNewSaleId,
};