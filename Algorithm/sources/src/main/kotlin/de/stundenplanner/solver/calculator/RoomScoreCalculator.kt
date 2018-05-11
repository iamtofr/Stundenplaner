package de.stundenplanner.solver.calculator

import de.stundenplanner.domain.*

object RoomScoreCalculator {

  private val roomCapacityWeight: Int = 5
  private val roomStabilityWeight: Int = 5

  internal fun calculateAndInsert(
    lecture: Lecture,
    scheduleRoom: Map<Room, Map<Period, ArrayList<Lecture>>>
  ): Pair<Int, Int> {
    val roomSchedule = scheduleRoom[lecture.room]!!
    val lecturesInPeriodInRoom = roomSchedule[lecture.period]!!

    val hardScore = calculateHardScore(lecture, lecturesInPeriodInRoom)
    val softScore = calculateSoftScore(lecture)

    lecturesInPeriodInRoom.add(lecture)
    return Pair(hardScore, softScore)
  }

  private fun calculateHardScore(lecture: Lecture, lecturesInPeriodInRoom: ArrayList<Lecture>): Int {
    return conflictingLecturesPenalty(lecturesInPeriodInRoom) + suitingTypePenalty(lecture)
  }

  /**
   * There should not be several lectures in the same period for the same room
   */
  private fun conflictingLecturesPenalty(lecturesInPeriod: ArrayList<Lecture>): Int {
    return lecturesInPeriod.size
  }


  /**
   * There should not be any lectures in rooms not suited for it.
   */
  private fun suitingTypePenalty(lecture: Lecture): Int {
    val room = lecture.room!!
    val subject = lecture.subject!!
    return if (subject.requiredRoomType !== room.roomType) -1 else 0
  }

  private fun calculateSoftScore(lecture: Lecture): Int {
    return roomCapacityPenalty(lecture) * roomCapacityWeight +
      roomStabilityPenalty(lecture) * roomStabilityWeight
  }

  /**
   * There is a penalty for a lecture located in a room not big enough to accommodate all students
   */
  private fun roomCapacityPenalty(lecture: Lecture): Int {
    val room = lecture.room!!
    val course = lecture.course!!
    return if (room.seats < course.studentSize) -1 else 0
  }

  /**
   * The same subject should be taught in the same room
   */
  private fun roomStabilityPenalty(lecture: Lecture){

  }

}