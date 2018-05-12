const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let teacher = new Schema({
    profile: {type: Schema.Types.ObjectId, ref: 'profile', required: true},
    subjectSpecialiations: {type: [Schema.Types.ObjectId], ref: 'subject', required: true}
});

module.exports = teacher;