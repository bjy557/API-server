//load packages
const express = require('express');
const bodyParser = require('body-parser');

//configure the route settings
const brokers = require('./routes/brokers');

//create webapp
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//add routes
app.get('/brokers', brokers.findAll);
app.post('/brokers', brokers.insertOne);

//configure server port
var port = 8080;

//Run server
app.listen(port, () => {
	console.log('Server running on port ' + port);
});
