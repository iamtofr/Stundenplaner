/**
 * This module defines a schema of periods.
 * It using mongoose as framework.
 *
 * @type {Schema}
 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let period = new Schema({
    weekday: {type: Number, required: true},
    timeSlot: {type: Number, required: true}
});

module.exports = period;