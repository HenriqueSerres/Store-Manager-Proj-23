const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  database: 'StoreManager',
  password: '20142017',
  user: 'root',
});

module.exports = connection; 