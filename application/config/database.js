const mysql = require ('mysql2');
const db = mysql.createPool({
host: 'localhost',
user: 'root',
database: 'csc317db',
password: 'Esau7777'

});

module.exports = db.promise();