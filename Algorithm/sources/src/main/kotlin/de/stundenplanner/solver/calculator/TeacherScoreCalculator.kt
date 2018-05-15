package de.stundenplanner.solver.calculator

import de.stundenplanner.domain.Lecture
import de.stundenplanner.domain.Teacher

class TeacherScoreCalculator : BasicScoreCalculator<Teacher>() {

  private val teacherPeriodsGapWeight: Int = 10


  override fun insertMove(lecture: Lecture?) {
    val lecturesInPeriodOfCourse = schedule!![lecture!!.teacher]!![lecture.period]!!
    lecturesInPeriodOfCourse.add(lecture)
  }

  override fun retractMove(lecture: Lecture?) {
    val lecturesInPeriodOfCourse = schedule!![lecture!!.teacher]!![lecture.period]!!
    lecturesInPeriodOfCourse.add(lecture)
  }

  override fun calculateHardScoreOfMove(lecture: Lecture?): Int {
    return conflictingLecturesPenalty(lecture)
  }

  override fun calculateSoftScoreOfMove(lecture: Lecture?): Int {
    return periodGapPenalty(lecture) * teacherPeriodsGapWeight
  }

  /**Hard:
   * There should not be several lectures in the same period for the same room
   */
  private fun conflictingLecturesPenalty(lecture: Lecture?): Int {
    val lecturesInPeriodInTeacher = schedule!![lecture!!.teacher]!![lecture.period]!!
    return lecturesInPeriodInTeacher.size
  }

  /**Soft:
   * There is a penalty for an isolated lecture in the teacher's schedule
   */
  private fun periodGapPenalty(lecture: Lecture?): Int {
    val teacherSchedule = schedule!![lecture!!.teacher]!!
    val period = lecture.period!!
    val day = period.day
    val periodBefore = day.periods[period.timeSlot - 1]
    val periodAfter = day.periods[period.timeSlot + 1]

    val thereIsALectureBefore = teacherSchedule[periodBefore]!!.size > 0
    val thereIsALectureAfter = teacherSchedule[periodAfter]!!.size > 0

    return when {
      thereIsALectureBefore && thereIsALectureAfter -> 2
      thereIsALectureBefore || thereIsALectureAfter -> 0
      else -> -2
    }
  }

}