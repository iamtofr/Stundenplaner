const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Address = require('schemaAdress');

let profile = new Schema({
    name: {type: String, required: true},
    surName: {type: String, required: true},
    role: [Role],
    dateOfBirth: {type: Date, required: true},
    address: Address,
    sex: {type: String, required: true},
    nationality: {type: String, required: true},
    email: {type: String, required: true},
    contact: {type: String, required: false},
    contactPhoneNumber: {type: String, required: true},
    hoursPerWeek: {type: Number, required: false},
    specialisation: {type: String, required: false},
    subjects: {type: Number, required: false}
});

module.exports = profile;