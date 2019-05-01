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

http.createServer((req, res)=>{
  let router = new Router(req, res);
  router.get('/', async (req, res) => {
    let response;
    let newMysql = new Mysql(db);
    try {
      response = await newMysql.update(
        'users', 
        ['username', 'password'], 
        ['new dayen', 'new password of dayen'],
        ['username'],
        ['dayen']
      );
      
      res.writeHead(203, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(response))
    } catch (error) {
      response = error.message;
    }
  })
}).listen(PORT, () => console.log(`runing on port ${PORT}`))
