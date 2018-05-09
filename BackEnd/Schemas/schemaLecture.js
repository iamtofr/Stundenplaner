const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Teacher = require('./schemaTeacher');
const Room = require('./schemaRoom');
const Course = require('./schemaCourse');
const Subject = require('./schemaSubject');
const Period = require('./schemaPeriod');

let lecture = new Schema({
    teacher: {type: Schema.Types.ObjectId, ref:'teacher', required: false},
    room: {type: Schema.Types.ObjectId, ref:'room', required: false},
    course: {type: Schema.Types.ObjectId, ref:'course', required: false},
    subject: {type: Schema.Types.ObjectId, ref:'subject', required: false},
    period: {type: Schema.Types.ObjectId, ref:'period', required: false},
    pinned: {type: Boolean, required: true}
});

module.exports = lecture;