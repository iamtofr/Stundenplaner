package de.stundenplanner.solver.calculator

import de.stundenplanner.domain.*

abstract class BasicScoreCalculator<T> {

  internal var schedule: Map<T, Map<Period, ArrayList<Lecture>>>? = null

  var hardScore: Int = 0
    private set

  var softScore: Int = 0
    private set

  open fun resetWorkingSolution(
    scheduleOwners: List<T>?, periods: List<Period>?, lectures: List<Lecture>?, mainSchedule: CourseSchedule?) {
    schedule = scheduleOwners!!
      .associate { it to periods!!.associate { it to ArrayList<Lecture>() } }

    lectures!!.forEach { insert(it) }
  }

  internal fun insert(lecture: Lecture?) {
    hardScore += calculateHardScoreOfMove(lecture)
    softScore += calculateSoftScoreOfMove(lecture)

    insertMove(lecture)
  }

  internal fun retract(lecture: Lecture?) {
    hardScore -= calculateHardScoreOfMove(lecture)
    softScore -= calculateSoftScoreOfMove(lecture)

    retractMove(lecture)
  }

  abstract fun insertMove(lecture: Lecture?)

  abstract fun retractMove(lecture: Lecture?)

  abstract fun calculateHardScoreOfMove(lecture: Lecture?): Int

  abstract fun calculateSoftScoreOfMove(lecture: Lecture?): Int
}