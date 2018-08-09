'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PersonSchema = new Schema({
    name: {
        type: String
    },
    birthDate: {
        type: String
    },
    countryOfBirth: {
        type: String
    },
})

module.exports = mongoose.model('person', PersonSchema);