
data class CourseSchedule(

  val periods: List<Period>,

  val teachers: List<Teacher>,

  //@get:ValueRangeProvider(id = "allRooms")
  val rooms: List<Room>,

  val courses: List<Course>,

  val subjects: List<Subject>

  //@get:PlanningEntityCollectionProperty
 // val lectures: List<String>

  //@get:PlanningScore
  //var score: HardSoftScore? = null

)

