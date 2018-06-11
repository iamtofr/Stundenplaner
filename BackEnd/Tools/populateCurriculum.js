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
    let outLecture = {
      teacherName: "",
      roomNumber: "",
      course: {},
      subjectName: "",
      period: {},
    };

    let teacherProfile = teacher.findById(lectureAlgo.teacher._id);
    outLecture.teacherName = await teacherProfile
      .populate('profile','name')
      .exec();

    let roomData = room.findById(lectureAlgo.room._id);
    outLecture.roomNumber = await roomData
      .populate('room','number')
      .exec();

    let courseData = course.findById(lectureAlgo.course._id);
    outLecture.course = await courseData
      .populate('course')
      .exec();

    let subjectData = subject.findById(lectureAlgo.subject._id);
    outLecture.subjectName = await subjectData
      .populate('subject', 'name')
      .exec();

    let periodData = period.findById(lectureAlgo.period._id);
    outLecture.period = await periodData
      .populate('period')
      .exec();
    lectureArray.push(outLecture);
  }
  return lectureArray;
};


module.exports.build = build;