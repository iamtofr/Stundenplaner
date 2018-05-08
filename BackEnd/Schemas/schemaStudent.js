const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Profile = require('./schemaProfile');

let student = new Schema({
    profile: {type: Profile, required: true},
    grade: {type: Number, required: true},
    subjectState: {type: Number, required: true}
});

module.exports = student;