package de.stundenplanner.domain

import org.optaplanner.examples.common.swingui.components.Labeled
import javax.security.auth.Subject

data class Subject(
  val name: String,
  val grade: Int,
  val occurrences: Int,
  val requiredEquipment: String?,
  val requiredRoomType: String = "general"
) : Persistable()

data class Teacher(
  val subjectSpecialization: List<Subject>
) : Persistable()

data class Course(
  val grade: Int,
  val letter: String,
  var studentSize: Int
) : Persistable()

data class Day(
  val periods: MutableList<Period>,
  private val weekDay: Int
) : Persistable(), Labeled {
  override fun getLabel(): String {
    return "Day $weekDay"
  }

  fun addPeriod(period: Period) {
    periods.add(period.timeSlot, period)
  }

  companion object {
    val DAYS = Array(7, { i -> Day(ArrayList(), i) })
  }
}

class Period(val timeSlot: Int, weekDay: Int) : Persistable(), Labeled {
  val day: Day = Day.DAYS[weekDay]

  init {
      day.addPeriod(this)
  }

  override fun getLabel(): String {
    return "${day.label}: $timeSlot"
  }
}

data class Room(
  val roomNr: Int,
  val house: String,
  val seats: Int,
  val barrierFree: Boolean,
  val equipment: List<String>,
  val roomType: String = "general"
) : Persistable(), Labeled {
  override fun getLabel(): String {
    return "Room $house $roomNr"
  }
}
