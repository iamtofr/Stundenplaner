const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let role = new Schema({
    read: {type: Boolean, required: true},
    write: {type: Boolean, required: true},
    print: {type: Boolean, required: true},
    create: {type: Boolean, required: true},
    delete: {type: Boolean, required: true}
});

module.exports = role;