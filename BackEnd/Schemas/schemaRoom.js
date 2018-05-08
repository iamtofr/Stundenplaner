const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let room = new Schema({
    number: {type: Number, required: true},
    seats: {type: Number, required: true},
    house: {type: String, required: true},
    equipment: {type: [String], required: false},
    type: {type: String, required: true},
    barrierFree: {type: Boolean, required: true}
});

module.exports = room;