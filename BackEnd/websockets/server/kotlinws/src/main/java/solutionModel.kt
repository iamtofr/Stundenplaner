//import java.time.Period
//
////@PlanningEntity(difficultyWeightFactoryClass = LectureDifficultyWeightFactory::class)
//class Lecture {
// // @get:PlanningPin
////  var pinned: Boolean = false
//
//  var course: Course? = null
//
//  var subject: Subject? = null
//
////  //@get:PlanningVariable(valueRangeProviderRefs = ["allPeriods"],
////    strengthWeightFactoryClass = PeriodStrengthWeightFactory::class)
//  var period: Period? = null
////
////  @get:PlanningVariable(valueRangeProviderRefs = ["allRooms"],
////    strengthWeightFactoryClass = RoomStrengthWeightFactory::class)
//  var room: Room? = null
////
////  @get:PlanningVariable(valueRangeProviderRefs = ["subjectTeachers"])
//  var teacher: Teacher? = null
////
////  @ValueRangeProvider(id = "subjectTeachers")
////  fun getSubjectTeachers() = subject!!.requiredTeacher
//
//  override fun toString(): String {
//    return (course).toString()
//  }
//}
