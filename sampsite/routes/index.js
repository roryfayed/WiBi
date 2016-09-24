var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var wifiSpeed =  require("../public/javascripts/wifispeed.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/listOfProducers', function(req, res, next){
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/rory123';
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log('Unable to connect to the server')
        } else {
            console.log('connection established');
            var collection = db.collection('producer');
            collection.find({}).toArray(function(err, result){
                if(err){
                    res.send(err);
                } else if (result.length){
                    res.render('producerList', {
                        "producerList" : result
                    });
                } else {
                    res.send('No documents found');
                }
                
                db.close();
            })
        }
    });
});

router.get('/mywifi', function(req, res){
    /*
    measureBW(10, function (e) {
        var wifiMbs = (e / 1000).toFixed(2).toString();
        var wifiText = "Your average wifi speed is " + wifiMbs + "Mbs";
        res.render('mywifi', {title: wifiText});
    });
    */
    
});

router.post('/addstudent', function(req, res){
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/rory123';
    
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log("Unable to connect to server");
        } else {
            console.log("Connected to server");
            var collection = db.collection("iot");
            var iot1 = {a: req.body.a, b: req.body.b};
            collection.insert([iot1], function(err, result){
               if(err){
                   console.log(err);   
               } else {
                   res.redirect("/thelist");
               }
                db.close();
            });
        }
    });
    
});


module.exports = router;
