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
 * collect Data from DB
 * @param data
 * @returns {*[]}
 */
let getData = (data) => {
  let fromGetData = data.find({}).exec().then((result, err) => {
      if (err) throw err;
      return result;
    }
  );
  return fromGetData;
};


async function buildAlgo() {
  try {
    let toAlgo = {
      periods: await getData(period),
      rooms: await getData(room),
      teachers: await getData(teacher),
      courses: await getData(course),
      subjects: await getData(subject),
    };
    // console.log('ich bin von hier du sack', toAlgo);
    return Promise.resolve(toAlgo);
  }
  catch (err) {
    console.log('hier error von collectData: ', err)
  }
}

// let buildAlgorithm = async () => {
//   try {
//     let toAlgo = {
//       periods: await getData(period),
//       rooms: await getData(room),
//       teachers: await getData(teacher),
//       courses: await getData(course),
//       subjects: await getData(subject),
//     };
//     // console.log('ich bin von hier du sack', toAlgo);
//     return Promise.resolve(toAlgo);
//   }
//   catch (err) {
//     console.log('hier error von collectData: ', err)
//   }
// };


console.log(buildAlgo().then(1));
module.exports.buildAlgorithm = buildAlgo;