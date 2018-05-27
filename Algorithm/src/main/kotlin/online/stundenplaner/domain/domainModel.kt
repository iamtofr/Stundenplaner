package online.stundenplaner.domain

import online.stundenplaner.persistence.Persistable

data class Subject(
  val name: String,
  val grade: Int,
  val occurrences: Int,
  val requiredEquipment: String?,
  val requiredRoomType: String = "general"
) : Persistable() {
  val requiredTeacher: ArrayList<Teacher> = ArrayList()
}

data class Teacher(
  private val subjectSpecialization: List<Subject>
) : Persistable() {
  init {
    subjectSpecialization
      .forEach { subject -> subject.requiredTeacher.add(this) }
  }
}

data class Course(
  val grade: Int,
  val letter: String,
  var studentSize: Int
) : Persistable()

data class Day(
  val periods: MutableList<Period>,
  private val weekDay: Int
) : Persistable() {
  fun addPeriod(period: Period) {
    periods.add(period.timeSlot, period)
  }

  companion object {
    val DAYS = Array(7, { i -> Day(ArrayList(), i) })
  }
}

class Period(val timeSlot: Int, weekDay: Int) : Persistable() {
  val day: Day = Day.DAYS[weekDay]

  init {
    day.addPeriod(this)
  }
}

data class Room(
  val roomNr: Int,
  val house: String,
  val seats: Int,
  val barrierFree: Boolean,
  val equipment: List<String>,
  val roomType: String = "general"
) : Persistable()
