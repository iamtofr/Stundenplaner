const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Student = require('./schemaStudent');

let schoolClass = new Schema({
    grade: {type: String, required: true},
    letter: {type: String, required: false},
    students: {type: [Student], required: true}
});

module.exports = schoolClass;