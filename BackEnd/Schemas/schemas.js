'use Strict';


let address = require('./schemaAddress.js');
let profile = require('./schemaProfile.js');
let teacher = require('./schemaTeacher.js');
let course = require('./schemaCourse.js');
let student = require('./schemaStudent.js');
let room = require('./schemaRoom.js');
let role = require('./schemaRole.js');
let subject = require('./schemaSubject.js');
let lecture = require('./schemaLecture.js');

const collection = {
    address: address,
    profile: profile,
    teacher: teacher,
    course: course,
    student: student,
    room: room,
    role: role,
    subject: subject,
    lecture: lecture
};

module.exports = collection;

