const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Address = require('./schemaAddress');
const Role = require('./schemaRole');

let profile = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    role: {type: Role, required: true},
    dateOfBirth: {type: Date, required: false},
    address: Address,
    sex: {type: String, required: false},
    nationality: {type: String, required: false},
    email: {type: String, required: false},
    contact: {type: String, required: false},
    phoneNumber: {type: String, required: false},
    photo: {type: String, required: false}
});

module.exports = profile;