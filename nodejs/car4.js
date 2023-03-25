const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

var reqz = 1;
var resz = 1;


var INDEX_HTML1 = fs.readFileSync('car4.html', 'utf8');
var car4src = fs.readFileSync('car4src.js', 'utf8');

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
    const myURL = new URL(url, 'http://127.0.0.1:3000/');
    console.log('%s', reqz++, method, myURL.pathname, bodystring);
    if (method == "POST") {
      console.log('%s', 'processing', method, bodystring);
      res.statusCode = 204;
      res.end();
      return
    };
    console.log('%s', 'processing ', method, url)
    switch (myURL.pathname) {
      case "/":
      case "/SetSpeed":
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(INDEX_HTML1);
        res.end();
        break;
      case "/range":
        res.statusCode = 404;
        res.end();
        break;
      case "/car4src.js":
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(car4src);
        res.end();
        break;
      default:
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><body>');
        res.write('<h1>Hello, World!</h1>');
        res.write('<h2>headers</h2>');
        res.write(JSON.stringify(headers));
        res.write('<h2>method</h2>');
        res.write(method);
        res.write('<h2>url</h2>');
        res.write(url);
        res.write('<h3>pathname</h3>');
        res.write(myURL.pathname);
        res.write('<h2>body</h2>');
        res.write(JSON.stringify(body));
        res.write('</body>');
        res.write('</body></html>');
        res.end();
    };
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});