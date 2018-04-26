const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Student = require('./schemaStudent');

let schoolClass = new Schema({
    name: {type: String, required: true},
    stundets: {type: [Student], required: true},
});

module.exports = schoolClass;