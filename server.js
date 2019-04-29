const http = require('http');
const { promisify } = require('util');
const mysql = require('mysql');
const PORT = process.env.PORT || 8888;

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});
db.connect();

http
  .createServer( async (req, res) => {
    let select = db.query('SELECT * FROM users', (err, users) => {
      if(err) console.log(err.message);

      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(users))
    })
  })
  .listen(PORT, e => console.log(`runing on port ${PORT}`));
