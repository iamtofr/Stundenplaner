const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let adress = new Schema({
    deviceName: {type: String, required: true},
    value: {type: String, required: true}
});

module.exports = adress;