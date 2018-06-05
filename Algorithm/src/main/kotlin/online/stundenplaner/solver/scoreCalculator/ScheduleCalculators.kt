package online.stundenplaner.solver.scoreCalculator

import online.stundenplaner.persistence.Persistable

abstract class ScheduleCalculator<T : Persistable, U : BasicCalculator> : BasicCalculator {
  protected lateinit var allSchedules: Map<T, U>

  override fun calculateSoftScore(): Int =
    allSchedules.values.map { it.calculateSoftScore() }.sum()

  override fun calculateHardScore(): Int =
    allSchedules.values.map { it.calculateHardScore() }.sum()
}
