const http = require('http');
const PORT = process.env.PORT || 8888;

http
  .createServer((req, res) => {
    res.end('<h1>Live<h1/>')
  })
  .listen(PORT, e => console.log(`runing on port ${PORT}`));
