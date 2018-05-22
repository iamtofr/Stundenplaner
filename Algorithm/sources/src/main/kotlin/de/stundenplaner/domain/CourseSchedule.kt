package de.stundenplaner.domain

import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty
import org.optaplanner.core.api.domain.solution.PlanningScore
import org.optaplanner.core.api.domain.solution.PlanningSolution
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore

@PlanningSolution
class CourseSchedule : Persistable() {

  @get:ValueRangeProvider(id = "allPeriods")
  var periods: List<Period>? = null

  var teachers: List<Teacher>? = null

  @get:ValueRangeProvider(id = "allRooms")
  var rooms: List<Room>? = null

  var courses: List<Course>? = null

  var subjects: List<Subject>? = null

  @get:PlanningEntityCollectionProperty
  var lectures: List<Lecture>? = null

  @get:PlanningScore
  var score: HardSoftScore? = null

}
