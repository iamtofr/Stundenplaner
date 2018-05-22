const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const schemaIn = require('../Schemas/schemas');
let Period = mongoose.model('profile', schemaIn.period);

let lecture = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: 'teacher', required: false },
  room: { type: Schema.Types.ObjectId, ref: 'room', required: false },
  course: { type: Schema.Types.ObjectId, ref: 'course', required: false },
  subject: { type: Schema.Types.ObjectId, ref: 'subject', required: false },
  period: { type: Period, required: false },
  pinned: { type: Boolean, required: true }
});

module.exports = lecture;