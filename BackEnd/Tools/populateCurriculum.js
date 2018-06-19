const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const Schema = require('../Schemas/schemas');
const period = mongoose.model('period', Schema.period);
const teacher = mongoose.model('teacher', Schema.teacher);
const room = mongoose.model('room', Schema.room);
const course = mongoose.model('course', Schema.course);
const subject = mongoose.model('subject', Schema.subject);
const lecture = mongoose.model('lecture', Schema.lecture);


let build = (dataFromAlgo) => {
  return populateLectures(dataFromAlgo)
};

let populateLectures = async (dataFromAlgo) => {
  let lectureArray = [];

  for (let lectureAlgo of dataFromAlgo) {
    let outLecture = {};

    let teacherProfile = teacher.findById(lectureAlgo.teacher);
    outLecture.teacher = await teacherProfile
      .populate('profile')
      .exec();

    let roomData = room.findById(lectureAlgo.room);
    outLecture.room = await roomData
      .populate('room')
      .exec();

    let courseData = course.findById(lectureAlgo.course);
    outLecture.course = await courseData
      .populate('course')
      .exec();

    let subjectData = subject.findById(lectureAlgo.subject);
    outLecture.subject = await subjectData
      .populate('subject')
      .exec();

    let periodData = period.findById(lectureAlgo.period);
    outLecture.period = await periodData
      .populate('period')
      .exec();
    lectureArray.push(outLecture);
  }
  return lectureArray;
};


module.exports.build = build;