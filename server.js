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
  router.get('/users', async (req, res) => {
    let response;
    let newMysql = new Mysql(db);
    try {
      let users = await newMysql.select(
        ['username', 'password', 'id'],
        'users',
        ['username'],
        ['dayen']
      )
      console.log("response" , users);
      response = users;
    } catch (error) {
      response = error.message;
    }
    console.log(response)
    res.writeHead(201, {
      'content-type': 'application/json'
    });
    res.end(JSON.stringify(response));
  })
}).listen(PORT, () => console.log('runing'))
