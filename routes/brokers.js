//load mongodb packages
var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('broker', server);

//configure mongodb server
db.open(function(err, db) {
        if(!err){
                console.log("Connected to 'broker' database");
                db.collection('brokers', {strict:true}, function(err, collection){
                        if(err){
                                console.log("The 'brokers' collection doesn't exist.");
                        }
                });
        }
});

exports.findAll = function(req, res) {
	db.collection('brokers', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.insertOne = function(req, res) {
	var brok = req.body;
	console.log('Adding broker: ' + JSON.stringify(brok));
	db.collection('brokers', function(err, collection) {
		collection.insert(brok, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};
