console.log('Server-side-noexp code running');


const {parse} = require('querystring');
const http = require('http');
const path = require('path');
const fs = require('fs');
var url = require("url");

const {spawn} = require('child_process');


const requestHandler = (req, res) => {
  fs.readFile("index_noexp.html",(err, data) => {
      if(!err) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
      }
    });

  if (/formrecv_post/i.test(req.url)) {
    if (req.method == 'POST') {
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString(); // convert Buffer to string
      });
      req.on('end', () => {
          console.log(parse(body));
          res.end('Thank you for submitting Joyce Leung, your secret information will be revealed in no time');
      });
    } else {
      res.end('Error!');
    }
  }

  if (/python_run/i.test(req.url)) {
    console.log('Now running the dangerous python script');
    const python = spawn('python', ['test.py']);
  }

  //
  // if (/josh/i.test(req.url)) {
  //   res.writeHead(200, {
  //     'Content-Type': 'image/jpeg'
  //   });
  //   const image = path.join( path.dirname(require.main.filename), 'images', 'img1.jpeg' );
  //   const readStream = fs.createReadStream(image);
  //   return readStream.pipe(res);
  // }
  //
  // if (/sam/i.test(req.url)) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/html'
  //   });
  //   res.write('<a href="/josh/" download>Download</a>');
  //   return res.end();
  // }
};


const server = http.createServer(requestHandler);

// server.on('request', (req, resp) => {
//     if(req.url === '/' && req.method === 'GET') {
//         data=fs.readFileSync(__dirname + '/index.html')
//         resp.writeHead(200, {
//             'Content-Type': 'text/html',
//         })
//         return resp.end(data)
//     }
// })

server.listen(8080, '192.168.1.127');
