'use strict';

// const dbExecute = require('../database/DBFunctions');
// const dbModel = require('../models/dbModel');

let mongoose = require('mongoose');
let Person = mongoose.model('person');

exports.getPeople = (req, res) => {
    Person.find({},function(err, results) {
      return res.send(results);
    });
  };
  

exports.addPerson = (req, res) =>{
    let newPerson = new Person(req.body);
    newPerson.save((err, person) => {
      if (err){
        res.send(err);
        return;
      }
      return res.send(person);

    })   
};


exports.getPersonById = function(req, res) {
  Person.findById(req.params.personId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.updatePersonById = function(req, res) {
  Person.findOneAndUpdate({_id: req.params.personId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.deletePersonById = function(req, res) {
  Person.remove({
    _id: req.params.personId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Person successfully deleted' });
  });
};

