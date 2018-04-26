'use Strict';


let address = require('./schemaAddress.js');
let profile = require('./schemaProfile.js');
let teacher = require('./schemaTeacher.js');
let schoolClass = require('./schemaClass.js');
let student = require('./schemaStudent.js');
let room = require('./schemaRoom.js');
let studentRole = require('./schemaStudentRole.js');
let teacherRole = require('./schemaTeacherRole.js');
let adminRole = require('./schemaAdministratorRole.js');
let managementRole = require('./schemaManagementRole.js');
let subject = require('./schemaSubject.js');
let classSubject = require('./schemaClassSubject.js');

const collection = {
    address: address,
    profile: profile,
    teacher: teacher,
    schoolClass: schoolClass,
    student: student,
    room: room,
    studentRole: studentRole,
    teacherRole: teacherRole,
    adminRole: adminRole,
    managementRole: managementRole,
    subject: subject,
    classSubject: classSubject
};

module.exports = collection;

