const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let role = new Schema({
    _id: {type: String, required: true, default: 'Student'},
    read: {type: Boolean, required: true, default: true},
    write: {type: Boolean, required: true, default: false},
    print: {type: Boolean, required: true, default: true},
    create: {type: Boolean, required: true, default: false},
    delete: {type: Boolean, required: true, default: false}
});

module.exports = role;