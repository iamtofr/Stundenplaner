const mongoose = require('mongoose');
let Schema = mongoose.Schema;


//TODO in jedem course ist ein array an students. Das array muss nicht übertragen werden, sondern nur die anzahl der students
let toAlgorithm = new Schema({
    periods: [{type: Schema.Types.ObjectId, ref: 'period', required: true}],
    teachers: [{type: Schema.Types.ObjectId, ref: 'teacher', required: true}],
    rooms: [{type: Schema.Types.ObjectId, ref: 'room', required: true}],
    courses: [{type: Schem.Types.ObjectId, ref: 'course', required: true}],
    subjects: [{type: Schema.Types.ObjectId, ref: 'subject', required: true}],
    score: {type: Number, required: false}
});

module.exports = toAlgorithm;