const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let toAlgorithm = new Schema({
    periods: [{type: Schema.Types.ObjectId, ref: 'period', required: true}],
    teachers: [{type: Schema.Types.ObjectId, ref: 'teacher', required: true}],
    rooms: [{type: Schema.Types.ObjectId, ref: 'room', required: true}],
    courses: [{type: Schema.Types.ObjectId, ref: 'course', required: true}],
    subjects: [{type: Schema.Types.ObjectId, ref: 'subject', required: true}],
    score: {type: Number, required: false}
});

module.exports = toAlgorithm;