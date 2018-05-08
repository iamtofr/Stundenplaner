const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Teacher = require('./schemaTeacher');
const Room = require('./schemaRoom');
const Course = require('./schemaCourse');
const Subject = require('./schemaSubject');
const Period = require('./schemaPeriod');

let lecture = new Schema({
    teacher: {type: Teacher, required: false},
    room: {type: Room, required: false},
    course: {type: Course, required: false},
    subject: {type: Subject, required: false},
    period: {type: Period, required: false},
    pinned: {type: Boolean, required: true}
});

module.exports = lecture;