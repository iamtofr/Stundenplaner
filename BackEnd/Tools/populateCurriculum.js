const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stundenplaner');
const Schema = require('../Schemas/schemas');
const period = mongoose.model('period', Schema.period);
const teacher = mongoose.model('teacher', Schema.teacher);
const room = mongoose.model('room', Schema.room);
const course = mongoose.model('course', Schema.course);
const subject = mongoose.model('subject', Schema.subject);
const lecture = mongoose.model('lecture', Schema.lecture);


let build = async (dataFromAlgo) => {
  let outLectureArray = [];
  populateLectures(dataFromAlgo).then((result) => {
    outLectureArray.push(result);
  });
  return outLectureArray;
};

let populateLectures = async (dataFromAlgo) => {
  for (let lectureAlgo of dataFromAlgo) {

    let outLecture = {
      teacherName: "",
      roomNumber: "",
      course: {},
      subjectName: "",
      period: {},
    };

    let teacherProfile = lectureAlgo.teacher.findById(lectureAlgo.teacher._id);
    outLecture.teacherName = await teacherProfile.populate('profile').exec(function(err, result) {
      if (err) throw err;
      return result.name;
    });

    let room = lectureAlgo.room.findById(lectureAlgo.room._id);
    outLecture.roomNumber = await room.populate('room').exec(function(err, result) {
      if (err) throw err;
      return result.number;
    });

    let course = lectureAlgo.course.findById(lectureAlgo.course._id);
    outLecture.course = await course.populate('course').exec(function(err, result) {
      if (err) throw err;
      return {
        grade: result.grade,
        letter: result.letter,
      };
    });

    let subject = await lectureAlgo.subject.findById(lectureAlgo.subject._id);
    outLecture.subjectName = subject.populate('subject').exec(function(err, result) {
      if (err) throw err;
      return result.name;
    });

    let period = await lectureAlgo.period.findById(lectureAlgo.period._id);
    outLecture.period = period.populate('period').exec(function(err, result) {
      if (err) throw err;
      return result;
    });
  }
};


module.exports = build;