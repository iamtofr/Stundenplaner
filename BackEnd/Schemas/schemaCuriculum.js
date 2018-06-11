/**
 * This module defines a schema of curriculums.
 * It using mongoose as framework.
 *
 * @type {Schema}
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaIn = require('../Schemas/schemas');

let Lecture = schemaIn.lecture;

let curriculum = new Schema({
  solution: { type: Number, required: true },
  lectures: { type: [ Lecture ], required: false },
});

module.exports = curriculum;