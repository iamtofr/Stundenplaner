package de.stundenplanner.domain

import de.stundenplanner.solver.LectureDifficultyWeightFactory
import de.stundenplanner.solver.PeriodStrengthWeightFactory
import de.stundenplanner.solver.RoomStrengthWeightFactory
import org.optaplanner.core.api.domain.entity.PlanningEntity
import org.optaplanner.core.api.domain.entity.PlanningPin
import org.optaplanner.core.api.domain.variable.PlanningVariable

@PlanningEntity(difficultyWeightFactoryClass = LectureDifficultyWeightFactory::class)
class Lecture: Persistable() {
  @get:PlanningPin
  var pinned: Boolean = false

  var course: Course? = null

  var subject: Subject? = null

  @get:PlanningVariable(valueRangeProviderRefs = ["allPeriods"],
    strengthWeightFactoryClass = PeriodStrengthWeightFactory::class)
  var period: Period? = null

  @get:PlanningVariable(valueRangeProviderRefs = ["allRooms"],
    strengthWeightFactoryClass = RoomStrengthWeightFactory::class)
  var room: Room? = null

  @get:PlanningVariable(valueRangeProviderRefs = ["allTeachers"])
  var teacher: Teacher? = null

  override fun toString(): String {
    return (course).toString()
  }
}
