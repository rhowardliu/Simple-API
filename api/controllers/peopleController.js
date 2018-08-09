'use strict';
const db = require('../../database/db')

exports.getPeople = (req, res, err) =>{
    if (err)
        res.send(err);
    res.json(db.people);
}