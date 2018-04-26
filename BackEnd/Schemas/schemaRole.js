const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const admin = require('./schemaAdministratorRole');
const student = require('./schemaStudentRole');
const teacher = require('./schemaTeacherRole');
const management = require('./schemaManagementRole');

let role = new Schema({
    type: [admin,student,teacher,management]
});

module.exports = role;