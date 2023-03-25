const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var reqz = 1;
var resz = 1;


var INDEX_HTML1 = `<!DOCTYPE HTML>
<html>
<head>
<meta name="viewport" content="width = device-width, initial-scale = 1.0, maximum-scale = 1.0, user-scalable=0">
<link rel="shortcut icon" href="#" >
<style> .slider {width: 90%%; margin-left: 5%%; } </style>
<title>ESP32 Web Form</title>
</head>
<body>
<h1>ESP32 Web Form</h1>
<FORM name="myform" action="/SetSpeed" method="post">
<P>Speed<br>
<INPUT type="range" name="S1" min="40" max="255" step="10" value="77" 
 class="slider" oninput="onin(1)" id="S1">"
<output name="O1" id="O1"> S1 </output>
<INPUT type="submit"> <INPUT type="reset">
</P>
</FORM>
`;

var INDEX_HTML2 = `
<script>
var slider = document.getElementById("S1");
var output = document.getElementById("O1");
if (sessionStorage.resz) {} else {
 sessionStorage.resz = 1
};
document.write(sessionStorage.resz);

output.value = slider.value;

function myonrestch(xhttp) {
    sessionStorage.resz = Number(sessionStorage.resz) + 1;
};
  
slider.oninput = function() {
output.value = this.value;
var sendparam="Speed="+this.value;
var xhttp= new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  myonrestch(this);
};
xhttp.open("POST", "/SetSpeed", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(sendparam);
}
</script>
</body>
</html>
`;


const server = http.createServer((req, res) => {
  var { headers, method, url } = req;
  let body = [];
  let bodystring ='';
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
        res.write(url); res.write("  ");
        res.write(method); res.write("  ");
        res.write(reqz.toFixed()); res.write("  ");
        res.write(INDEX_HTML2);
        res.end();
        break;
      case "/range":
        res.statusCode = 404;
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