//load packages
const express = require('express');
const bodyParser = require('body-parser');

//configure the route settings
const clients = require('./routes/clients');

//create web app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//add routes
app.get('/clients', clients.findAll);
app.post('/clients', clients.insertOne);

//configure server port
var port = 8088;

//Run server
app.listen(port, () => {
	console.log('Server running on port ' + port);
});
