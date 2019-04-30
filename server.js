const http = require('http');
const { promisify } = require('util');
const mysql = require('mysql');
// use a envirenement variable
require('dotenv').config();
const { PORT, DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE } = process.env;

const Mysql = require('./models/Mysql')
const Router = require('./utils/Router')

let db; 
try {
  db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
  });
  db.connect();
} catch (error) {
  throw new Error(`Connection to database is failed with message: ${error.message}`);
}


let p = new Mysql(db);

let res = p.insert(
  'users',
  ['username', 'password'], 
  ['username_val', 'emaild_val']
).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err)
});