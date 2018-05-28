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
 *
 * @param data
 * @returns {Promise<any>}
 */
let getData = (data) => {
  let fromGetData = data.find({}).exec().then((result, err) => {
      if (err) throw err;
      return result;
    }
  );
  return fromGetData;
};

let calcStudentSize = (courses) => {

 courses.forEach((course)=> {
   let size = course.students.length;
   course.students = [];
   course.students.push(size);
 });
  return courses;
};


async function buildAlgo() {
  try {
    let toAlgo = {
      periods: await getData(period),
      rooms: await getData(room),
      teachers: await getData(teacher),
      // courses: calcStudentSize(await getData(course)),
      courses: (await getData(course)),
      subjects: await getData(subject),
    };
    // console.log('ich bin von hier du sack', toAlgo);
    return toAlgo;
  }
  catch (err) {
    console.log('hier error von collectData: ', err)
  }
}

// console.log(buildAlgo().then((data) => console.log(data)));
module.exports.buildAlgorithm = buildAlgo;