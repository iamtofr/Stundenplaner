/**
 * This module defines a collection of all schemas.
 * It using mongoose as framework.
 *
 * @type {collection}
 */

'use Strict';


let account = require('./schemaAccount.js');
let address = require('./schemaAddress.js');
let period = require('./schemaPeriod.js');
let profile = require('./schemaProfile.js');
let role = require('./schemaRole.js');
let room = require('./schemaRoom.js');
let student = require('./schemaStudent.js');
let course = require('./schemaCourse.js');
let subject = require('./schemaSubject.js');
let teacher = require('./schemaTeacher.js');
let lecture = require('./schemaLecture.js');
let toAlgorithm = require('./schemaToAlgorithm.js');
let curriculum = require('./schemaCuriculum.js');



const collection = {
  account: account,
  address: address,
  course: course,
  lecture: lecture,
  period: period,
  profile: profile,
  role: role,
  room: room,
  student: student,
  subject: subject,
  teacher: teacher,
  curriculum: curriculum,
  toAlgorithm: toAlgorithm,

};

module.exports = collection;

