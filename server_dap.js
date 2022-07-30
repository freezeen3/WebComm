console.log('Server-side DAP running');


const {parse} = require('querystring');
const http = require('http');
const path = require('path');
const fs = require('fs');
var url = require("url");

const {spawn} = require('child_process');
const spawn1 = require('child_process').exec;

var start_date;
var end_date;
var req_type;

const requestHandler = (req, res) => {
  fs.readFile("dap.html",(err, data) => {
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
          console.log('The start date is:', parse(body).start_date);
          console.log('The end date is:', parse(body).end_date);
          console.log('The request type is:', parse(body).req_type);
          // res.end('Thank you for submitting');

          fs.readFile("dap.html",(err, data) => {
              if(!err) {
                  res.writeHead(200, {'Content-Type': 'text/html'});
                  res.end(data);
              }
          });
      });
    } else {
      res.end('Error!');
    }
  }

  if (/python_run/i.test(req.url)) {
    console.log('Now running the dangerous python script');
    try {

      const { spawn } = require('node:child_process');
      // const ls = spawn('ls', ['-lh', '/usr']);
      //
      // ls.stdout.on('data', (data) => {
      //   console.log(`stdout: ${data}`);
      // });

      // __dirname + '/index.html'
      // '/Users/chanyuyan/nodetest/test.py'
      var python = spawn('python', ['/Users/chanyuyan/nodetest/test.py']);
      // var python = spawn1('python', [__dirname + '/test.py']);
      python.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      })


    } catch (error) {
      console.error(error);
    } finally {
      console.log('Not sure what happened');
    }
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
