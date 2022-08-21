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

var html_file = 'dap.html'

var python_output = ''

function serveStaticFile(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;

    // __dirname will resolve to the directory the executing script resides in.
    // So if your script resides in /home/sites/app.js, __dirname will resolve
    // to /home/sites.

    console.log(__dirname + path);

    fs.readFile(__dirname + path, function(err, data) {
        if(err) {
            res.writeHead(500, { 'Content-Type' : 'text/plain' });
            res.end('500 - Internal Error');
        }
        else {
            console.log('About to serve image');

            res.writeHead( responseCode, { 'Content-Type' : contentType });

            res.end(data);
        }
    });
}


const requestHandler = (req, res) => {
  fs.readFile(html_file, (err, data) => {
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

          fs.readFile(html_file, (err, data) => {
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

      console.log('Trying to run it');

      // var python = spawn1('python', ['/Users/chanyuyan/nodetest/test.py']);

      const python = spawn('python3', ['/Users/chanyuyan/nodetest/test.py']);
      // const python = spawn('open', ['-W', '-a', 'Termina.app', 'python3', '--args', '/Users/chanyuyan/nodetest/test.py']);

      // const python = spawn('ls', ['-lh', '/usr']);


      python.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      })

      python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        console.log('After running');
      });




    } catch (error) {
      console.log('Error detected')
      console.error(error);
    } finally {
      console.log('Not sure what happened');
    }
  }

  //
  if (/jquery-3.6.0.min.js/i.test(req.url)) {
    res.writeHead(200, {
      'Content-Type': 'text/javascript'
    });
    const jq_file = path.join( path.dirname(require.main.filename), 'jquery-3.6.0.min.js' );
    const readStream = fs.createReadStream(jq_file);
    return readStream.pipe(res);
  };

  if (/josh/i.test(req.url)) {
    if (req.method == 'POST') {
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString(); // convert Buffer to string
      });
      req.on('end', () => {
          console.log(parse(body));
          console.log('The output message is:', parse(body).output);

          // res.end('Thank you for submitting');

          fs.readFile(html_file, (err, data) => {
              if(!err) {
                  res.writeHead(200, {'Content-Type': 'text/html'});
                  res.end(data);
              }
          });
      });
    } else {
      res.end('Error!');
    }
  };

  if (/append_output/i.test(req.url)) {
    if (req.method == 'POST') {
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString(); // convert Buffer to string
      });
      req.on('end', () => {

          let temp_output = JSON.parse(body).output;
          console.log('The output message is:', temp_output);

          // Append to python_output
          python_output += temp_output;
          python_output += '\n';

      });
    } else {
      res.end('Error!');
    }

  };

  if (/display_output/i.test(req.url)) {
    if (req.method == 'GET') {
      res.end(python_output);
    } else {
      res.end('Error!');
    }

  }




};


const server = http.createServer(requestHandler);


server.listen(8080, '192.168.1.127');
