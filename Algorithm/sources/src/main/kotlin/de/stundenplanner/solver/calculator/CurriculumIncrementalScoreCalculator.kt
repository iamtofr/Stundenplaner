package de.stundenplanner.solver.calculator

import de.stundenplanner.domain.*
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore
import org.optaplanner.core.impl.score.director.incremental.AbstractIncrementalScoreCalculator

object CurriculumIncrementalScoreCalculator : AbstractIncrementalScoreCalculator<CourseSchedule>() {


  private val calculators: Map<String, BasicScoreCalculator<Persistable>> = mapOf(
    "teacher" to TeacherScoreCalculator() as BasicScoreCalculator<Persistable>,
    "room" to RoomScoreCalculator() as BasicScoreCalculator<Persistable>,
    "course" to CourseScoreCalculator() as BasicScoreCalculator<Persistable>
  )

  override fun resetWorkingSolution(schedule: CourseSchedule?) {
    schedule!!
    val owners = mapOf(
      "teacher" to schedule.teachers,
      "room" to schedule.rooms,
      "course" to schedule.courses
      )
    val periods = schedule.periods
    val lectures = schedule.lectures

    calculators.forEach { variableName: String, calculator ->
      calculator.resetWorkingSolution(
        owners[variableName],
        periods,
        lectures,
        schedule
      )
    }
  }


  override fun beforeEntityAdded(lecture: Any?) {
    calculators.values.forEach { calculator -> calculator.insert(lecture as Lecture) }
  }

  override fun afterEntityAdded(lecture: Any?) {
    // Do nothing
  }

  override fun beforeVariableChanged(lecture: Any?, variableName: String) {
    calculators[variableName]?.retract(lecture as Lecture)
      ?: calculators.values.forEach { calculator -> calculator.insert(lecture as Lecture) }
  }

  override fun afterVariableChanged(lecture: Any?, variableName: String) {
    calculators[variableName]?.insert(lecture as Lecture)
      ?: calculators.values.forEach { calculator -> calculator.insert(lecture as Lecture) }
  }

  override fun beforeEntityRemoved(lecture: Any?) {
    // Do nothing
  }

  override fun afterEntityRemoved(lecture: Any?) {
    calculators.values.forEach { calculator -> calculator.retract(lecture as Lecture) }
  }

  override fun calculateScore(): HardSoftScore {
    val hardScore = calculators.values.map { it.hardScore }.sum()
    val softScore = calculators.values.map { it.softScore }.sum()
    return HardSoftScore.valueOf(hardScore, softScore)
  }

}