package online.stundenplaner.solver.scoreCalculator.scheduleCalculators

import online.stundenplaner.domain.*
import online.stundenplaner.solver.scoreCalculator.ScheduleCalculator
import online.stundenplaner.solver.scoreCalculator.entityCalculators.RoomScoreCalculator

class RoomScheduleCalculator
  : ScheduleCalculator<Room, DayCalculator<RoomScoreCalculator>>() {

  private var softScore = 0
  private val roomStabilityWeight: Int = 10
  private var roomsPerSubjects: Map<Subject, Map<Course, MutableMap<Room, Int>>>? = null

  override fun resetWorkingSolution(schoolSchedule: SchoolSchedule) {
    roomsPerSubjects = schoolSchedule.subjects
      .associate {
        it to schoolSchedule.courses
          .associate { it to mutableMapOf<Room, Int>() }
      }
    softScore = 0

    allSchedules = schoolSchedule.rooms
      .associate {
        it to DayCalculator({ day -> RoomScoreCalculator(day) })
      }
    allSchedules.values.forEach { it.resetWorkingSolution(schoolSchedule) }
    schoolSchedule.lectures.forEach { insert(it) }
  }

  override fun insert(lecture: Lecture) {
    if (!moveScorable(lecture)) return
    allSchedules[lecture.room]!!.insert(lecture)

    insertMove(lecture)
    softScore += calculateSoftScoreAfterMove(lecture)
  }

  private fun insertMove(lecture: Lecture) {
    val roomsPerSubjectPerCourse = roomsPerSubjects!![lecture.subject]!![lecture.course]

    val numberOfRooms = roomsPerSubjectPerCourse!![lecture.room]
    roomsPerSubjectPerCourse[lecture.room!!] = if (numberOfRooms != null) numberOfRooms + 1 else 1
  }

  override fun retract(lecture: Lecture) {
    if (!moveScorable(lecture)) return
    allSchedules[lecture.room]!!.retract(lecture)

    softScore -= calculateSoftScoreAfterMove(lecture)
    retractMove(lecture)
  }

  private fun retractMove(lecture: Lecture) {
    val roomsPerSubjectPerCourse = roomsPerSubjects!![lecture.subject]!![lecture.course]!!

    val numberOfRooms = roomsPerSubjectPerCourse[lecture.room]!!
    val newAmountOfRooms = numberOfRooms - 1

    if (newAmountOfRooms == 0) roomsPerSubjectPerCourse.remove(lecture.room!!)
    else roomsPerSubjectPerCourse[lecture.room!!] = newAmountOfRooms
  }

  private fun moveScorable(lecture: Lecture): Boolean {
    return (lecture.room != null && lecture.period != null)
  }

  private fun calculateSoftScoreAfterMove(lecture: Lecture): Int {
    return roomStabilityPenalty(lecture) * roomStabilityWeight
  }

  /**Soft:
   * The same subject should be taught in the same room
   */
  private fun roomStabilityPenalty(lecture: Lecture): Int {
    return 1 - roomsPerSubjects!![lecture.subject]!![lecture.course]!!.size
  }

  override fun calculateSoftScore(): Int {
    return super.calculateSoftScore() + softScore
  }
}
