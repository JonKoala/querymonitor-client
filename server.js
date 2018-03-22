const path = require('path')
const express = require('express');

const appconfig = require('./appconfig')

var app = express();
app.use(express.static('dist'));

app.get(/.+\.\w+$/, function(req, res) {
  //requesting an unexisting file
  res.status(404).send();
});

app.get('*', function(req, res) {
  res.sendFile('index.html');
});

var port = appconfig['server']['port'];
app.listen(port, () => {
  console.log('Client up and running! Listening on ' + port + '...')
})
