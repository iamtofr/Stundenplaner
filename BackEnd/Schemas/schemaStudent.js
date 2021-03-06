/**
 * This module defines a schema of students.
 * It using mongoose as framework.
 *
 * @type {Schema}
 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let student = new Schema({
    profile: {type: Schema.Types.ObjectId, ref: 'profile', required: true}
});

module.exports = student;