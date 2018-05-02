const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Address = require('./schemaAddress');
const Subject = require('./schemaSubject');

let profile = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    role: {type: Schema.Types.ObjectId, required: false}, //TODO delete requirement
    dateOfBirth: {type: Date, required: true},
    address: Address,
    sex: {type: String, required: true},
    nationality: {type: String, required: true},
    email: {type: String, required: true},
    contact: {type: String, required: false},
    phoneNumber: {type: String, required: true},
    hoursPerWeek: {type: Number, required: false},
    subjectSpecialisationsTeacher: [Subject],
    subjectSpecialisationsStudent: [Subject]
});

module.exports = profile;