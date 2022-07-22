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
  return result[0];
};

const getNewSaleId = async () => {
  const [{ insertId: id }] = await connection.execute(`
  INSERT INTO sales (date) VALUES (NOW());
  `);
  return id;
};

const addSales = async (saleId, productId, quantity) => {  
  const productSold = await connection.execute(`
  INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);
  `, [saleId, productId, quantity]);
  return productSold;
};

const findSaleId = async (id) => {
  const [result] = await connection.execute(`
  SELECT * FROM sales WHERE id = ?
  `, [id]);
  return result;
};

const upDateSales = async (id, productId, quantity) => {
  const [result] = await connection.execute(`
  UPDATE sales_products SET product_id = ?, quantity = ?
  WHERE sale_id = ?;
  `, [productId, quantity, id]);
  return result;
};

const deleteSales = async (id) => {
  await connection.execute(`
  DELETE FROM sales_products WHERE sale_id = ?;
  `, [id]);
  return { id };
};

module.exports = {
  getAllSales,
  getSaleId,
  addSales,
  getNewSaleId,
  upDateSales,
  findSaleId,
  deleteSales,
};