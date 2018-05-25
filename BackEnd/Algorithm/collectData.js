'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const Schema = require('../Schemas/schemas');
const period = mongoose.model('period', Schema.period);
const teacher = mongoose.model('teacher', Schema.teacher);
const room = mongoose.model('room', Schema.room);
const course = mongoose.model('course', Schema.course);
const subject = mongoose.model('subject', Schema.subject);


/**
 * collect Data from DB and push to array
 * @param data
 * @returns {*[]}
 */
let getData = (data) => {
  console.log('test info');
  data.find({}).exec().then((result,err) => {
      if (err) throw err;
      return result;
    }
  );
};

let buildAlgorithm = async () => {

  let test = {
    name: 'test'
  };
  return test;
  // try {
  //   let toAlgo = {
  //     periods: await getData(period),
  //     rooms: await getData(room),
  //     teachers: await getData(teacher),
  //     courses: await getData(course),
  //     subjects: await getData(subject),
  //   };
  //   return toAlgo;
  // }
  // catch (err) {
  //   console.log('hier error von collectData: ', err)
  // }
};

module.exports = JSON.stringify(buildAlgorithm());