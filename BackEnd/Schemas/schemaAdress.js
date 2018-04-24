const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let adress = new Schema({
    street: {type: String, required: true},
    number: {type: String, required: true},
    city: {type: String, required: true},
    zipCode: {type: String, required: true}
});

module.exports = adress;