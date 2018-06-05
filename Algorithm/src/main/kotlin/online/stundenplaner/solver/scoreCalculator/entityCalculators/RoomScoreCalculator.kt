package online.stundenplaner.solver.scoreCalculator.entityCalculators

import online.stundenplaner.domain.*
import online.stundenplaner.solver.scoreCalculator.EntityScoreCalculator

class RoomScoreCalculator(day: Day) : EntityScoreCalculator(day) {

  private val roomCapacityWeight: Int = 10

  override fun insertMove(lecture: Lecture) {
    val lecturesInPeriodOfRoom = schedule[lecture.period!!.timeSlot]
    lecturesInPeriodOfRoom.add(lecture)
  }


  override fun retractMove(lecture: Lecture) {
    val lecturesInPeriodOfRoom = schedule[lecture.period!!.timeSlot]
    lecturesInPeriodOfRoom.remove(lecture)
  }

  override fun calculateHardScoreBeforeMove(lecture: Lecture): Int {
    val penalty = conflictingLecturesPenalty(lecture)
    val penalty2 = suitingTypePenalty(lecture)
    return penalty + penalty2
  }

  /**Hard:
   * There should not be several lectures in the same period for the same room
   */
  private fun conflictingLecturesPenalty(lecture: Lecture): Int {
    val lecturesInPeriodInRoom = schedule[lecture.period!!.timeSlot]
    return -lecturesInPeriodInRoom.size
  }

  /**Hard:
   * There should not be any lectures in rooms not suited for it.
   */
  private fun suitingTypePenalty(lecture: Lecture): Int {
    val room = lecture.room!!
    val subject = lecture.subject!!
    return if (subject.requiredRoomType != room.roomType) -1 else 0
  }

  override fun calculateSoftScoreBeforeMove(lecture: Lecture): Int {
    return roomCapacityPenalty(lecture) * roomCapacityWeight
  }

  /**Soft:
   * There is a penalty for a lecture located in a room not big enough to accommodate all students
   */
  private fun roomCapacityPenalty(lecture: Lecture): Int {
    val room = lecture.room!!
    val course = lecture.course!!
    val tooManyStudentsBy = course.studentSize - room.seats
    return -Math.max(tooManyStudentsBy, 0)
  }
}
