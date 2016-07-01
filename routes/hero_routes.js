var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );

router.post('/addHero', function(req, res){
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

router.get('/getHeroes', function(req, res){
  heroes.find()
  .then( function( data ){
    res.send( data );
  });
});

router.post('/deleteHero', function (req, res){
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




module.exports = router;
