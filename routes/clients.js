//load mongodb packages
var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('client', server);

//configure mongodb server
db.open(function(err, db) {
        if(!err){
                console.log("Connected to 'client' database");
                db.collection('clients', {strict:true}, function(err, collection){
                        if(err){
                                console.log("The 'clients' collection doesn't exist.");
                        }
                });
        }
});

exports.findAll = function(req, res) {
        db.collection('clients', function(err, collection) {
                collection.find().toArray(function(err, items) {
                        res.send(items);
                });
        });
};

exports.insertOne = function(req, res) {
	var cli = req.body;
        console.log('Adding client: ' + JSON.stringify(cli));
        db.collection('clients', function(err, collection) {
                collection.insert(cli, {safe:true}, function(err, result) {
                        if (err) {
                                res.send({'error':'An error has occurred'});
                        } else {
                                console.log('Success: ' + JSON.stringify(result[0]));
                                res.send(result[0]);
                        }
                });
        });
};
