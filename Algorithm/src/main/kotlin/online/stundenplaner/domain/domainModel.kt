package online.stundenplaner.domain

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import online.stundenplaner.persistence.Persistable

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "_id")
data class Subject(
  val name: String?,
  val grade: Int,
  val occurrences: Int,
  val requiredEquipment: String?,
  val requiredRoomType: String?
) : Persistable() {
  @JsonIgnore
  val requiredTeacher: MutableSet<Teacher> = mutableSetOf()
}

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "_id")
class Teacher(
  val subjectSpecialisations: List<Subject>
) : Persistable()

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "_id")
data class Course(
  val grade: Int,
  val letter: String,
  @JsonIgnore var studentSize: Int
) : Persistable()

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "_id")
data class Day(
  val periods: MutableMap<Int, Period>,
  val weekday: Int
) : Persistable() {

  fun addPeriod(period: Period) {
    periods[period.timeSlot] = period
  }

  companion object {
    val DAYS = mutableListOf<Day>()
  }

}

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "_id")
data class Period(var timeSlot: Int, val weekday: Int) : Persistable() {
  @JsonIgnore
  val day: Day

  init {
    timeSlot--
    var day = Day.DAYS.find { it.weekday == weekday }

    if (day == null) {
      day = Day(HashMap(), weekday)
      Day.DAYS.add(day)
    }

    day.addPeriod(this)
    this.day = day
  }
}

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "_id")
data class Room(
  val number: Int,
  val house: String,
  val seats: Int,
  val barrierFree: Boolean,
  val equipment: List<String>,
  val roomType: String?
) : Persistable()
