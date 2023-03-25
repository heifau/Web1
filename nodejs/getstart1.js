const http = require('http');

const hostname = '127.0.1.0';
const port = 3001;

var cnt = 0;


const server = http.createServer((req, res) => {
  var { headers, method, url } = req;
  let body = [];
  let bodystring = '';
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    bodystring = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
    if (method == "POST") {
      console.log('%s', 'processing', method, bodystring, headers);
      res.statusCode = 204;
      res.end();
      return
    };
    console.log('%s', 'processing ', method, url, headers)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    res.write( (cnt++).toFixed());
    res.end();
    cnt++;
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});