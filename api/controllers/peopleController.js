'use strict';

// const dbExecute = require('../database/DBFunctions');
// const dbModel = require('../models/dbModel');

let mongoose = require('mongoose');
let People = mongoose.model('person');

exports.getPeople = (req, res) => {
    People.find({},function(err, results) {
      return res.send(results);
    });
  };
  




// exports.addPerson = (req, res) =>{
//     person = dbExecute.collection('people').post(req.body);
//     if (!person)
//         res.send('Error');

//     else res.send(person);
    
// }

