package online.stundenplaner.solver.scoreCalculator.scheduleCalculators

import online.stundenplaner.domain.*
import online.stundenplaner.solver.scoreCalculator.ScheduleCalculator
import online.stundenplaner.solver.scoreCalculator.entityCalculators.TeacherScoreCalculator

class TeacherScheduleCalculator
  : ScheduleCalculator<Teacher, DayCalculator<TeacherScoreCalculator>>() {
  private var hardScore: Int = 0

  private lateinit var taughtOccurrencesOfSubjectsPerTeacher: Map<Course, Map<Subject, MutableMap<Teacher, MutableList<Lecture>?>>>

  override fun resetWorkingSolution(schoolSchedule: SchoolSchedule) {
    taughtOccurrencesOfSubjectsPerTeacher = schoolSchedule.courses
      .associate { course ->
        course to schoolSchedule.subjects
          .associate { subject ->
            subject to mutableMapOf<Teacher, MutableList<Lecture>?>()
          }
      }
    hardScore = 0

    allSchedules = schoolSchedule.teachers
      .associate {
        it to DayCalculator({ day -> TeacherScoreCalculator(day) })
      }
    allSchedules.values.forEach { it.resetWorkingSolution(schoolSchedule) }
    schoolSchedule.lectures.forEach { insert(it) }
  }

  override fun insert(lecture: Lecture) {
    if (!moveScorable(lecture)) return
    allSchedules[lecture.teacher]!!.insert(lecture)

    insertMove(lecture)
    hardScore += calculateHardScoreAfterMove(lecture)
  }

  private fun insertMove(lecture: Lecture) {
    val course = lecture.course
    val subject = lecture.subject
    val teacher = lecture.teacher!!

    val teachingTeachers = taughtOccurrencesOfSubjectsPerTeacher[course]!![subject]!!
    if (teachingTeachers[teacher] == null) teachingTeachers[teacher] = mutableListOf()
    teachingTeachers[teacher]!!.add(lecture)
  }

  override fun retract(lecture: Lecture) {
    if (!moveScorable(lecture)) return
    allSchedules[lecture.teacher]!!.retract(lecture)

    hardScore -= calculateHardScoreAfterMove(lecture)
    retractMove(lecture)
  }

  private fun retractMove(lecture: Lecture) {
    val course = lecture.course
    val subject = lecture.subject
    val teacher = lecture.teacher!!

    val teachingTeachers = taughtOccurrencesOfSubjectsPerTeacher[course]!![subject]!!
    val taughtLectures = teachingTeachers[teacher]!!
    taughtLectures.remove(lecture)
    if (taughtLectures.size == 0) teachingTeachers.remove(teacher)
  }

  private fun moveScorable(lecture: Lecture): Boolean {
    return lecture.teacher != null && lecture.period != null
  }

  private fun calculateHardScoreAfterMove(lecture: Lecture): Int {
    return differentTeachersPenalty(lecture)
  }

  /**Hard:
   * A teacher should teach all occurrences of a subject
   */
  private fun differentTeachersPenalty(lecture: Lecture): Int {
    val course = lecture.course
    val subject = lecture.subject
    val teachingTeachers = taughtOccurrencesOfSubjectsPerTeacher[course]!![subject]!!
    return 1 - teachingTeachers.size
  }

  override fun calculateHardScore(): Int {
    return super.calculateHardScore() + hardScore
  }
}