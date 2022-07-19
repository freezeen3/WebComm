console.log('Server-side code running');

const express = require('express');

const app = express();

// serve files from the public directory
app.use(express.static('public'));


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

app.post('/', (req, res) => {
  console.log('Hi!');
});



app.post('/page', function (req, res) {
    calling.aFunction();
    res.send('A message!');
    console.log('Got a message from client!');
});
