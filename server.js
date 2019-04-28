const http = require('http');
const PORT = process.env.PORT || 8888;

http
  .createServer((req, res) => {
    http.get(
      'http://www.jumia.dz',
      response => {
        const { statusCode, headers } = response;
        let error, _res;
        // if( statusCode !== 200 ) {
        //   throw new Error(`Request failed status code  ${statusCode}`)
        // }
        if( !/(json|html)/i.test(headers['content-type']) ) {
          res.writeHead(200, {'Content-Type': "text/html"})
          res.end('<h1>Try another link</h1>')
        }
        let dataRaw = '';
        response.setEncoding('utf8')
        response.on('data', chunk => dataRaw+=chunk)
        response.on('end', () => {
          console.log(headers);
          res.writeHead(statusCode, {'Content-Type': headers['content-type']})
          res.end(dataRaw)
        })
      }
    ).on('error', e => console.error(e.message));
  })
  .listen(PORT, e => console.log(`runing on port ${PORT}`));
