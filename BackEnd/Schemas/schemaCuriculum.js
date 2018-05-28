const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = require('../Schemas/schemas');

let Lecture = schema.lecture;

let curriculum = new Schema({
  solution: {type: Number, required: true},
  lectures: {type: [Lecture], required: true},
});

module.exports = curriculum;