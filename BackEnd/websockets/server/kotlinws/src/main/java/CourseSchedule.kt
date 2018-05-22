
import java.time.Period


class CourseSchedule {

  //@get:ValueRangeProvider(id = "allPeriods")
  var periods: List<Period>? = null

  var teachers: List<Teacher>? = null

  //@get:ValueRangeProvider(id = "allRooms")
  var rooms: List<Room>? = null

  var courses: List<Course>? = null

  var subjects: List<Subject>? = null

  //@get:PlanningEntityCollectionProperty
  var lectures: List<Lecture>? = null

  //@get:PlanningScore
  //var score: HardSoftScore? = null

}
