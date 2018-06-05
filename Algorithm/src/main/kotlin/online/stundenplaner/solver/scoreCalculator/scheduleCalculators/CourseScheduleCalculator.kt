package online.stundenplaner.solver.scoreCalculator.scheduleCalculators

import online.stundenplaner.domain.Course
import online.stundenplaner.domain.Lecture
import online.stundenplaner.domain.SchoolSchedule
import online.stundenplaner.solver.scoreCalculator.ScheduleCalculator
import online.stundenplaner.solver.scoreCalculator.entityCalculators.CourseScoreCalculator

class CourseScheduleCalculator
  : ScheduleCalculator<Course, DayCalculator<CourseScoreCalculator>>() {

  override fun resetWorkingSolution(schoolSchedule: SchoolSchedule) {
    allSchedules = schoolSchedule.courses
      .associate {
        it to DayCalculator({ day -> CourseScoreCalculator(day) })
      }
    allSchedules.values.forEach { it.resetWorkingSolution(schoolSchedule) }
    schoolSchedule.lectures.forEach { insert(it) }
  }

  private fun moveScorable(lecture: Lecture): Boolean {
    return lecture.period != null
  }

  override fun insert(lecture: Lecture) {
    if (!moveScorable(lecture)) return
    allSchedules[lecture.course]!!.insert(lecture)
  }

  override fun retract(lecture: Lecture) {
    if (!moveScorable(lecture)) return
    allSchedules[lecture.course]!!.retract(lecture)
  }
}