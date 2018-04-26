const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Teacher = require('./schemaTeacher');
const Room = require('./schemaRoom');
const Class = require('./schemaClass');

let classSubject = new Schema({
    teacher: {type: Teacher, required: true},
    room: {type: Room, required: true},
    class: {type: Class, required: true}
});

module.exports = classSubject;