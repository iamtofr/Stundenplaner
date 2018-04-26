const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Profile = require('./schemaProfile');


let teacher = new Schema({
    profile: {type: Profile, required: true}
});

module.exports = teacher;