console.log('Server-side code running');

const express = require('express');
// const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express();

// serve files from the public directory
app.use(express.static('public'));
// app.use(express.static('images'));

// start the express web server listening on 8080
app.listen(8080, '192.168.1.127', () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.json());

app.post('/josh', (req, res) => {
  console.log('Yo Josh');
  console.log(req.body);
})

app.get('/imgdl', (req, res) => {
  console.log('Someone is downloading the prize');
  // res.writeHead(200, {
  //   'Content-Type': 'image/jpeg'
  // });
  // const image = path.join( path.dirname(require.main.filename), 'images', 'img1.jpeg' );
  res.sendFile(path.join(__dirname, 'images/img1.jpeg'));
  // const image = 'images/img1.jpeg';
  // const readStream = fs.createReadStream(image);
  // return readStream.pipe(res);
})

app.post('/', (req, res) => {
  console.log('Hi!');
});

app.post('/formrecv_post', (req, res) => {
  console.log('Submitted form with POST');
  res.send('Thank you for submitting with POST, we will review soon!');
})

app.get('/formrecv_get', (req, res) => {
  console.log('Submitted form with GET');
  res.send('Thank you for submitting with GET, we will review soon!');
})

app.post('/page', function (req, res) {
    // calling.aFunction();
    res.send('A message!');
    console.log('Got a message from client!');
});
