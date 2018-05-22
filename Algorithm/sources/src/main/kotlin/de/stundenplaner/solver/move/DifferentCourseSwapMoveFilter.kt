package de.stundenplaner.solver.move

import de.stundenplaner.domain.CourseSchedule
import de.stundenplaner.domain.Lecture
import org.optaplanner.core.impl.heuristic.selector.common.decorator.SelectionFilter
import org.optaplanner.core.impl.heuristic.selector.move.generic.SwapMove
import org.optaplanner.core.impl.score.director.ScoreDirector

class DifferentCourseSwapMoveFilter : SelectionFilter<CourseSchedule, SwapMove<*>> {

  override fun accept(scoreDirector: ScoreDirector<CourseSchedule>, move: SwapMove<*>): Boolean {
    val leftLecture = move.leftEntity as Lecture
    val rightLecture = move.rightEntity as Lecture

    return leftLecture.course != rightLecture.course
  }

}
