/**
 * This module defines a schema of lectures.
 * It using mongoose as framework.
 *
 * @type {Schema}
 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let lecture = new Schema({
  teacher: {type: Schema.Types.ObjectId, ref:'teacher', required: false},
  room: {type: Schema.Types.ObjectId, ref:'room', required: false},
  course: {type: Schema.Types.ObjectId, ref:'course', required: false},
  subject: {type: Schema.Types.ObjectId, ref:'subject', required: false},
  period: {type: Schema.Types.ObjectId, ref:'period', required: false},
  pinned: {type: Boolean, required: false},
});

module.exports = lecture;