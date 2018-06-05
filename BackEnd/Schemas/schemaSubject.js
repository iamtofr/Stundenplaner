/**
 * This module defines a schema of subjects.
 * It using mongoose as framework.
 *
 * @type {Schema}
 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let subject = new Schema({
    name: {type: String, required: true},
    occurrences: {type: Number, required: true},
    requiredRoomType: {type: String, required: false}
});

module.exports = subject;