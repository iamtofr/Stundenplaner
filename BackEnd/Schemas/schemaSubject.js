const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let subject = new Schema({
    name: {type: String, required: true},
    state: {type: Number, required: true}
});

module.exports = subject;