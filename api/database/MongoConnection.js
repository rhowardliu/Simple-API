const mongoose = require('mongoose');

//Initiate Database Model
require('../models/dbModel');

const mongoURL= 'mongodb://localhost:27017/noderest'

//Connect to URL
mongoose.connect(mongoURL, { useNewUrlParser: true });

// Throws error if connection fails
const db = mongoose.connection;
module.exports = db.on('error', ()=>{
    throw new Error('unable to connect to database at ' + mongoURL);
});