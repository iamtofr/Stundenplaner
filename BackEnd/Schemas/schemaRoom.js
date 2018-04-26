const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let room = new Schema({
    number: {type: Number, required: true},
    seats: {type: Number, required: true},
    houseNumber: {type: String, required: true},
    projector: {type: Boolean, required: true},
    type: {type: String, required: true},
    barrierFree: {type: Boolean, required: true}
});

module.exports = room;