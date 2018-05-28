import java.time.Period


data class Subject(
        val id: Int,
        val name: String,
  //val grade: Int,
        val occurrences: Int,
  //val requiredEquipment: String?,
        val requiredRoomType: String
)
//{
//  val requiredTeacher: ArrayList<Teacher> = ArrayList()
//}

data class Teacher(
        val id: Int,
        val subjectSpecialisations: List<Int>
       // private val subjectSpecialization: List<Subject>
)
//{
//  init {
//    subjectSpecialization
//      .forEach { subject -> subject.requiredTeacher.add(this) }
//  }
//}

data class Course(
        val id: Int,
        val grade: Int,
        val letter: String,
        var studentSize: Int
)

data class Period(
        val id: Int,
        val weekday: Int,
        val timeSlot: Int
)

//data class Day(
//        val periods: MutableList<Period>,
//        private val weekDay: Int
//)

data class Room(
        val id: Int,
        val number: Int,
        val seats: Int,
        val house: String,
        val equipment: List<String>,
        val type: String = "general",
        val barrierFree: Boolean
)

data class Lecture(
        val course: Course,
        val subject: Subject,
        val period: Period,
        val room: Room,
        val teacher: Teacher
)
