const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Address = require('schemaAdress');
const Subject = require('schemaAdress');

let profile = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    role: [Role],
    dateOfBirth: {type: Date, required: true},
    address: Address,
    sex: {type: String, required: true},
    nationality: {type: String, required: true},
    email: {type: String, required: true},
    contact: {type: String, required: false},
    PhoneNumber: {type: String, required: true},
    hoursPerWeek: {type: Number, required: false},
    subjectSpecialisationTeacher: [Subject],
    subjectSpecialisationStudent: [Subject]
});

module.exports = profile;