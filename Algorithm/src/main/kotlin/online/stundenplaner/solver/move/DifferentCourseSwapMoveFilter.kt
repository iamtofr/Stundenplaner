package online.stundenplaner.solver.move

import online.stundenplaner.domain.SchoolSchedule
import online.stundenplaner.domain.Lecture
import org.optaplanner.core.impl.heuristic.selector.common.decorator.SelectionFilter
import org.optaplanner.core.impl.heuristic.selector.move.generic.SwapMove
import org.optaplanner.core.impl.score.director.ScoreDirector

class DifferentCourseSwapMoveFilter : SelectionFilter<SchoolSchedule, SwapMove<*>> {

  override fun accept(scoreDirector: ScoreDirector<SchoolSchedule>, move: SwapMove<*>): Boolean {
    val leftLecture = move.leftEntity as Lecture
    val rightLecture = move.rightEntity as Lecture

    return leftLecture.course !== rightLecture.course && leftLecture.subject !== rightLecture.subject
  }

}
