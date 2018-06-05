package online.stundenplaner.solver.scoreCalculator

import online.stundenplaner.domain.Day
import online.stundenplaner.domain.Lecture
import online.stundenplaner.domain.SchoolSchedule


abstract class EntityScoreCalculator(private val day: Day) : BasicCalculator {

  protected lateinit var schedule: Array<MutableList<Lecture>>

  private var hardScore: Int = 0

  private var softScore: Int = 0

  final override fun calculateHardScore(): Int = hardScore

  final override fun calculateSoftScore(): Int = softScore

  override fun resetWorkingSolution(schoolSchedule: SchoolSchedule) {
    schedule = Array(day.periods.size, { ArrayList<Lecture>() })
    softScore = 0
    hardScore = 0
  }

  override fun insert(lecture: Lecture) {
    hardScore += calculateHardScoreBeforeMove(lecture)
    softScore += calculateSoftScoreBeforeMove(lecture)

    insertMove(lecture)

    hardScore += calculateHardScoreAfterMove(lecture)
    softScore += calculateSoftScoreAfterMove(lecture)
  }

  override fun retract(lecture: Lecture) {
    hardScore -= calculateHardScoreAfterMove(lecture)
    softScore -= calculateSoftScoreAfterMove(lecture)

    retractMove(lecture)

    hardScore -= calculateHardScoreBeforeMove(lecture)
    softScore -= calculateSoftScoreBeforeMove(lecture)
  }

  protected abstract fun insertMove(lecture: Lecture)
  protected abstract fun retractMove(lecture: Lecture)
  protected open fun calculateHardScoreBeforeMove(lecture: Lecture): Int = 0
  protected open fun calculateSoftScoreBeforeMove(lecture: Lecture): Int = 0
  protected open fun calculateHardScoreAfterMove(lecture: Lecture): Int = 0
  protected open fun calculateSoftScoreAfterMove(lecture: Lecture): Int = 0
}