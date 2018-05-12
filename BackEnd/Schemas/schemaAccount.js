const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let account = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String, required: false},
    profile: {type: Schema.Types.ObjectId, ref: 'profile', required: false}
});

module.exports = account;