import java.time.Period


data class Subject(
  val name: String,
  val grade: Int,
  val occurrences: Int,
  val requiredEquipment: String?,
  val requiredRoomType: String = "general"
) {
  val requiredTeacher: ArrayList<Teacher> = ArrayList()
}

data class Teacher(
  private val subjectSpecialization: List<Subject>
) {
  init {
    subjectSpecialization
      .forEach { subject -> subject.requiredTeacher.add(this) }
  }
}

data class Course(
  val grade: Int,
  val letter: String,
  var studentSize: Int
)

data class Day(
        val periods: MutableList<Period>,
        private val weekDay: Int
)

data class Room(
  val roomNr: Int,
  val house: String,
  val seats: Int,
  val barrierFree: Boolean,
  val equipment: List<String>,
  val roomType: String = "general"
)

data class Lecture(
        val course: Course,
        val subject: Subject,
        val period: Period,
        val room: Room,
        val teacher: Teacher
)
