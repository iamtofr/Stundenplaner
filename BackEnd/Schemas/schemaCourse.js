/**
 * This module defines a schema of school Classes.
 * It using mongoose as framework.
 *
 * @type {Schema}
 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schoolClass = new Schema({
    grade: {type: String, required: true},
    letter: {type: String, required: false},
    students: {type: Schema.Types.ObjectId, ref: 'student', required: true}
});

module.exports = schoolClass;