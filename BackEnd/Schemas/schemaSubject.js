const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let subject = new Schema({
    name: {type: String, required: true},
    grade: {type: Number, required: true},
    occurrences: {type: Number, required: true},
    requiredRoomType: {type: String, required: false}
});

module.exports = subject;