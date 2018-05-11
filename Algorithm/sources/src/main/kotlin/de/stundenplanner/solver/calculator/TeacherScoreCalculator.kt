package de.stundenplanner.solver.calculator

import de.stundenplanner.domain.Lecture
import de.stundenplanner.domain.Period
import de.stundenplanner.domain.Teacher

object TeacherScoreCalculator {

  private val teacherPeriodsGapWeight: Int = 10

  internal fun calculateAndInsert(
    lecture: Lecture,
    scheduleTeacher: Map<Teacher, Map<Period, ArrayList<Lecture>>>
  ): Pair<Int, Int> {
    val teacherSchedule = scheduleTeacher[lecture.teacher]!!
    val lecturesInPeriodOfTeacher = teacherSchedule[lecture.period]!!

    val hardScore = calculateHardScore(lecturesInPeriodOfTeacher)
    val softScore = calculateSoftScore(lecture, teacherSchedule)

    lecturesInPeriodOfTeacher.add(lecture)
    return Pair(hardScore, softScore)
  }

  private fun calculateHardScore(lecturesInPeriodOfTeacher: ArrayList<Lecture>): Int {
    return conflictingLecturesPenalty(lecturesInPeriodOfTeacher)
  }

  /**
   * There should not be several lectures in the same period for the same teacher
   */
  private fun conflictingLecturesPenalty(lecturesInPeriod: ArrayList<Lecture>): Int {
    return lecturesInPeriod.size
  }

  private fun calculateSoftScore(lecture: Lecture, teacherSchedule: Map<Period, ArrayList<Lecture>>): Int {
    return periodGapPenalty(lecture, teacherSchedule) * teacherPeriodsGapWeight
  }

  /**
   * There is a penalty for an isolated lecture in the teacher's schedule
   */
  private fun periodGapPenalty(lecture: Lecture, teacherSchedule: Map<Period, ArrayList<Lecture>>): Int {
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