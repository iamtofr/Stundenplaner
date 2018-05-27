package online.stundenplaner.domain

//import de.stundenplaner.solver.LectureDifficultyWeightFactory
//import de.stundenplaner.solver.PeriodStrengthWeightFactory
import online.stundenplaner.persistence.Persistable
import online.stundenplaner.solver.LectureDifficultyWeightFactory
import online.stundenplaner.solver.RoomStrengthWeightFactory
import org.optaplanner.core.api.domain.entity.PlanningEntity
import org.optaplanner.core.api.domain.entity.PlanningPin
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider
import org.optaplanner.core.api.domain.variable.PlanningVariable

@PlanningEntity(difficultyWeightFactoryClass = LectureDifficultyWeightFactory::class)
class Lecture: Persistable() {
  @get:PlanningPin
  var pinned: Boolean? = false

  var course: Course? = null

  var subject: Subject? = null

  @get:PlanningVariable(valueRangeProviderRefs = ["allPeriods"]
//    ,strengthWeightFactoryClass = PeriodStrengthWeightFactory::class
  )
  var period: Period? = null

  @get:PlanningVariable(valueRangeProviderRefs = ["allRooms"],
    strengthWeightFactoryClass = RoomStrengthWeightFactory::class)
  var room: Room? = null

  @get:PlanningVariable(valueRangeProviderRefs = ["subjectTeachers"])
  var teacher: Teacher? = null

  @ValueRangeProvider(id = "subjectTeachers")
  fun getSubjectTeachers() = subject!!.requiredTeacher

  override fun toString(): String {
    return (course).toString()
  }
}
