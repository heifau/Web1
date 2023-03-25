const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var INDEX_HTML1 = `<!DOCTYPE HTML>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="#">
<title>Formtest</title>
</head>
<body>
<h1>node.js Formtest</h1>
<FORM name="myform" action="/SetSpeed" method="post">
<INPUT type="text" name="T1" id="T1">
<INPUT type="submit" name="B1" id="B1" value="get" formmethod="get">
<INPUT type="submit" name="B2" id="B2" value="post" formmethod="post">
</FORM>
</body>
</html>
`;



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
        console.log('%s end: Switchstart', method, url, bodystring);
        switch (myURL.pathname) {
            default:
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(INDEX_HTML1);
                res.end();
                break;
        };
    });
});



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});