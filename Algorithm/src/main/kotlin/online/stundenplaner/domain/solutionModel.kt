package online.stundenplaner.domain

import com.fasterxml.jackson.annotation.JsonIdentityReference
import com.fasterxml.jackson.annotation.JsonIgnore
import online.stundenplaner.persistence.Persistable
import org.optaplanner.core.api.domain.entity.PlanningEntity
import org.optaplanner.core.api.domain.entity.PlanningPin
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider
import org.optaplanner.core.api.domain.variable.PlanningVariable

@PlanningEntity // (difficultyWeightFactoryClass = LectureDifficultyWeightFactory::class)
class Lecture(
  @JsonIdentityReference(alwaysAsId = true)
  var course: Course? = null,

  @JsonIdentityReference(alwaysAsId = true)
  var subject: Subject? = null
) : Persistable() {

  @get:PlanningPin
  var pinned: Boolean? = false

  @JsonIdentityReference(alwaysAsId = true)
  @get:PlanningVariable(valueRangeProviderRefs = ["allPeriods"]
//    ,strengthWeightFactoryClass = PeriodStrengthWeightFactory::class
  )
  var period: Period? = null

  @JsonIdentityReference(alwaysAsId = true)
  @get:PlanningVariable(valueRangeProviderRefs = ["allRooms"]
    //, strengthWeightFactoryClass = RoomStrengthWeightFactory::class
  )
  var room: Room? = null

  @JsonIdentityReference(alwaysAsId = true)
  @get:PlanningVariable(valueRangeProviderRefs = ["subjectTeachers"])
  var teacher: Teacher? = null

  @JsonIgnore
  @ValueRangeProvider(id = "subjectTeachers")
  fun getSubjectTeachers() = subject?.requiredTeacher

  override fun toString(): String {
    return "K: ${course?._id}, L: ${teacher?._id}, R: ${room?._id}, D: ${period?._id}"
  }
}
