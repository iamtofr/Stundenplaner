/**
 * This module defines a schema of teachers.
 * It using mongoose as framework.
 *
 * @type {Schema}
 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let teacher = new Schema({
    profile: {type: Schema.Types.ObjectId, ref: 'profile', required: true},
    subjectSpecialisations: {type: [Schema.Types.ObjectId], ref: 'subject', required: true}
});

module.exports = teacher;