var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/HeroeDB');

var heroSchema = new  mongoose.Schema({
  alias: String,
  first_name: String,
  last_name: String,
  city: String,
  power_name: String
});
var heroes = mongoose.model( 'heroes', heroSchema );

app.listen(4242, 'localhost', function(req, res){
  console.log('listening on 4242');
});
//loads index.html on entering base url, localhost:3000
app.get('/', function(req, res){
  res.sendFile(path.resolve('views/index.html'));
});
// can't make routes work!
// var heroRoute = require('../routes/hero_routes');
//
// app.use('/hero', heroRoute);

app.post('/addHero', function(req, res){
  console.log( 'req.body: ' + req.body.name );

  var recordToAdd={
   alias: req.body.alias,
   first_name: req.body.first_name,
   last_name: req.body.last_name,
   city: req.body.city,
   power_name: req.body.power_name
 };
 var newRecord=heroes( recordToAdd );
  newRecord.save();
});

app.get('/getHeroes', function(req, res){
  heroes.find()
  .then( function( data ){
    res.send( data );
  });
});

app.post('/deleteHero', function (req, res){
  console.log(req.body.id);
  heroes.findOne({'_id': req.body.id}, function(err, pet){
    if(err){
      console.log(err);
    }else{
      heroes.remove({'_id': req.body.id}, function(err){
        if(err){
          console.log('remove ' + err);
        }else{
        }
      });
    }
  });
});

app.use( express.static( 'public' ) );
