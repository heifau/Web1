const http = require('http');


const hostname = '127.0.2.0';
const port = 3002;

var cnt = 0;
var INDEX_HTML1 = `
<!doctype html>
<head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="#">
    <title>CORS test</title>
    <script>
        function myonrestch(xhttp) {
           outp = document.getElementById("O1");
           outp.value +="r";
        };

        function hff1() {
            let currs=77;
            var xhttp = new XMLHttpRequest();
            let docS1 = document.getElementById("S1");
            var sendparam = "LED=" + docS1;
            xhttp.onreadystatechange = function () {
                myonrestch(this);
            };
            xhttp.open("POST", "http://127.0.1.0:3001/SetSpeed", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(sendparam);
        };

        function onin(num) {
            inp = document.getElementById("S" + (num).toFixed());
            outp = document.getElementById("O" + (num).toFixed());
            outp.value = inp.value;
        };

    </script>
</head>

<body>
    <h1>Carrera</h1>
    <h2>Eingabe</h2>

    <FORM name="myform" action="/" method="post">
        <P>
            Speed <br>
            <INPUT type="range" name="S1" id="S1" oninput="onin(1)" min="0" max="255" step="10" value="77"
                class="slider">
            <output name="O1" id="O1"> S1 </output> <br>
         
            <input type="button" value="Stop" id="Stop" onclick="hff1()">
            <INPUT type="submit"> <INPUT type="reset">
        </P>
    </FORM>
 
</body>

</html>
`


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
    res.setHeader('Content-Type', 'text/HTML');
    res.write(INDEX_HTML1);
    res.end();
    cnt++;
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});