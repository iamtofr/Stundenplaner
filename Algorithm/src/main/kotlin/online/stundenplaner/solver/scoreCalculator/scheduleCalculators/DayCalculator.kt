package online.stundenplaner.solver.scoreCalculator.scheduleCalculators

import online.stundenplaner.domain.Day
import online.stundenplaner.domain.Lecture
import online.stundenplaner.domain.SchoolSchedule
import online.stundenplaner.solver.scoreCalculator.EntityScoreCalculator
import online.stundenplaner.solver.scoreCalculator.ScheduleCalculator


class DayCalculator<U : EntityScoreCalculator>(private val factory: (day: Day) -> U)
  : ScheduleCalculator<Day, U>() {
  override fun resetWorkingSolution(schoolSchedule: SchoolSchedule) {
    allSchedules = Day.DAYS.associate { it to factory(it) }
    allSchedules.values.forEach { it.resetWorkingSolution(schoolSchedule) }
  }

  override fun insert(lecture: Lecture) = allSchedules[lecture.period!!.day]!!.insert(lecture)
  override fun retract(lecture: Lecture) = allSchedules[lecture.period!!.day]!!.retract(lecture)
}
