package de.stundenplanner.solver

import de.stundenplanner.domain.CourseSchedule
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore
import org.optaplanner.core.impl.score.director.incremental.AbstractIncrementalScoreCalculator

object CurriculumIncrementalScoreCalculator: AbstractIncrementalScoreCalculator<CourseSchedule>() {


  override fun resetWorkingSolution(schedule: CourseSchedule) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.

  }

  override fun beforeEntityAdded(lecture: Any) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.

  }

  override fun afterEntityAdded(lecture: Any) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun beforeVariableChanged(lecture: Any, variableName: String) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun afterVariableChanged(lecture: Any, variableName: String) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun beforeEntityRemoved(lecture: Any) {
  }

  override fun afterEntityRemoved(lecture: Any) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun calculateScore(): HardSoftScore {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }
}