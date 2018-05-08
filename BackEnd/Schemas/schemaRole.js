const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let role = new Schema({
    name: {type: String, required: true},
    read: {type: Boolean, required: false},
    write: {type: Boolean, required: false},
    print: {type: Boolean, required: false},
    create: {type: Boolean, required: false},
    delete: {type: Boolean, required: false}
});

module.exports = role;