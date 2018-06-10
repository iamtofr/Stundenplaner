/**
 * This module defines a schema of lectures.
 * It using mongoose as framework.
 *
 * @type {Schema}
 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let lecture = new Schema({
  teacher: {type: Schema.Types.ObjectId, ref:'teacher', required: true},
  room: {type: Schema.Types.ObjectId, ref:'room', required: true},
  course: {type: Schema.Types.ObjectId, ref:'course', required: true},
  subject: {type: Schema.Types.ObjectId, ref:'subject', required: true},
  period: {type: Schema.Types.ObjectId, ref:'period', required: true},
  pinned: {type: Boolean, required: true}
});

module.exports = lecture;