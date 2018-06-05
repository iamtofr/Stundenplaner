package online.stundenplaner.solver.scoreCalculator

import online.stundenplaner.domain.SchoolSchedule
import online.stundenplaner.domain.Lecture
import online.stundenplaner.solver.scoreCalculator.scheduleCalculators.CourseScheduleCalculator
import online.stundenplaner.solver.scoreCalculator.scheduleCalculators.RoomScheduleCalculator
import online.stundenplaner.solver.scoreCalculator.scheduleCalculators.TeacherScheduleCalculator
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore
import org.optaplanner.core.impl.score.director.incremental.AbstractIncrementalScoreCalculator

class IncrementalScoreCalculator : AbstractIncrementalScoreCalculator<SchoolSchedule>() {

  private lateinit var schedule: SchoolSchedule

  private val calculators: Map<String, BasicCalculator> = mapOf(
    "teacher" to TeacherScheduleCalculator(),
    "room" to RoomScheduleCalculator(),
    "course" to CourseScheduleCalculator()
  )

  override fun resetWorkingSolution(schedule: SchoolSchedule?) {
    this.schedule = schedule!!

    calculators.forEach { _, calculator ->
      calculator.resetWorkingSolution(schedule)
    }
  }

  override fun beforeEntityAdded(lecture: Any?) {
    // Do nothing
  }

  override fun afterEntityAdded(lecture: Any?) {
    calculators.values.forEach { calculator -> calculator.insert(lecture as Lecture) }
  }

  override fun beforeVariableChanged(lecture: Any?, variableName: String) {
    calculators[variableName]?.retract(lecture as Lecture)
      ?: calculators.values.forEach { calculator -> calculator.retract(lecture as Lecture) }
  }

  override fun afterVariableChanged(lecture: Any?, variableName: String) {
    calculators[variableName]?.insert(lecture as Lecture)
      ?: calculators.values.forEach { calculator -> calculator.insert(lecture as Lecture) }
  }

  override fun beforeEntityRemoved(lecture: Any?) {
    calculators.values.forEach { calculator -> calculator.retract(lecture as Lecture) }
  }

  override fun afterEntityRemoved(lecture: Any?) {
    // Do nothing
  }

  override fun calculateScore(): HardSoftScore {
    val hardScore = calculators.values.map { it.calculateHardScore() }.sum()
    val softScore = calculators.values.map { it.calculateSoftScore() }.sum()
    if (schedule.score != null && schedule.score!!.isSolutionInitialized && softScore == 0 && hardScore == 0)
      println("$hardScore & $softScore")
    return HardSoftScore.valueOf(hardScore, softScore)
  }

}