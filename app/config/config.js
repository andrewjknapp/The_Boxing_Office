const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'joelspielberger', // what password do we use
  database: 'users_db'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
module.exports = connection;