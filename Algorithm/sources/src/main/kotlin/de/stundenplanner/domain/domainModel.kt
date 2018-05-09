package de.stundenplanner.domain

import org.optaplanner.examples.common.swingui.components.Labeled
import javax.security.auth.Subject

data class Subject(
  val name: String,
  val grade: Int,
  val occurrences: Int,
  val requiredRoomType: String
) : Persistable()

data class Teacher(
  val subjectSpecialization: List<Subject>
) : Persistable()

data class Course(
  val grade: Int,
  val letter: String,
  var studentSize: Int
) : Persistable()

class Period(
  val weekDay: Int,
  val timeSlot: Int
) : Persistable(), Labeled {
  override fun getLabel(): String {
    return "Day $weekDay: $timeSlot"
  }
}

data class Room(
  val roomNr: Int,
  val house: String,
  val seats: Int,
  val barrierFree: Boolean,
  val equipment: List<String>,
  val roomType: String
) : Persistable(), Labeled {
  override fun getLabel(): String {
    return "Room $house $roomNr"
  }
}
