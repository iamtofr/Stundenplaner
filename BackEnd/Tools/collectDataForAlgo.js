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
 * @returns
 */
let getData = (data) => {
  return data.find({}).exec().then((result, err) => {
      if (err) throw err;
      return result;
    }
  );
};

let calcStudentSize = (courses) => {
 courses.forEach((course)=> {
   course.studentSize = course.students.length;
   course.students = [];
 });
  return courses;
};


async function buildAlgo() {
  try {
    let toAlgo = {
      periods: await getData(period),
      rooms: await getData(room),
      teachers: await getData(teacher),
      courses: calcStudentSize(await getData(course)),
      subjects: await getData(subject),
    };
    return toAlgo;
  }
  catch (err) {
    console.log('hier error von collectData: ', err)
  }
}
module.exports.buildAlgorithm = buildAlgo;