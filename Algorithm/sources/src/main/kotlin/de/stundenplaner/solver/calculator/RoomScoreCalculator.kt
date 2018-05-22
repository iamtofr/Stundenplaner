package de.stundenplaner.solver.calculator

import de.stundenplaner.domain.*

class RoomScoreCalculator : BasicScoreCalculator<Room>() {

  private val roomCapacityWeight: Int = 5
  private val roomStabilityWeight: Int = 5

  private var roomsPerSubject: Map<Subject, ArrayList<Room>>? = null

  override fun resetWorkingSolution(
    scheduleOwners: List<Room>?, periods: List<Period>?, lectures: List<Lecture>?, mainSchedule: CourseSchedule?
  ) {
    schedule = scheduleOwners!!
      .associate { it to periods!!.associate { it to ArrayList<Lecture>() } }
    roomsPerSubject = mainSchedule!!.subjects!!
      .associate { it to ArrayList<Room>() }

    lectures!!.forEach { insert(it) }
  }

  override fun insertMove(lecture: Lecture?) {
    val lecturesInPeriodOfRoom =schedule!![lecture!!.room]!![lecture.period]!!
    lecturesInPeriodOfRoom.add(lecture)
    roomsPerSubject!![lecture.subject]!!.add(lecture.room!!)
  }

  override fun retractMove(lecture: Lecture?) {
    val lecturesInPeriodOfRoom =schedule!![lecture!!.room]!![lecture.period]!!
    lecturesInPeriodOfRoom.remove(lecture)
    roomsPerSubject!![lecture.subject]!!.remove(lecture.room!!)
  }

  override fun calculateHardScoreOfMove(lecture: Lecture?): Int {
    return conflictingLecturesPenalty(lecture) + suitingTypePenalty(lecture)
  }

  override fun calculateSoftScoreOfMove(lecture: Lecture?): Int {
    return roomCapacityPenalty(lecture) * roomCapacityWeight +
      roomStabilityPenalty(lecture) * roomStabilityWeight
  }

  /**Hard:
   * There should not be several lectures in the same period for the same room
   */
  private fun conflictingLecturesPenalty(lecture: Lecture?): Int {
    val lecturesInPeriodInRoom = schedule!![lecture!!.room]!![lecture.period]!!
    return lecturesInPeriodInRoom.size
  }

  /**Hard:
   * There should not be any lectures in rooms not suited for it.
   */
  private fun suitingTypePenalty(lecture: Lecture?): Int {
    val room = lecture!!.room!!
    val subject = lecture.subject!!
    return if (subject.requiredRoomType !== room.roomType) -1 else 0
  }

  /**Soft:
   * There is a penalty for a lecture located in a room not big enough to accommodate all students
   */
  private fun roomCapacityPenalty(lecture: Lecture?): Int {
    val room = lecture!!.room!!
    val course = lecture.course!!
    return if (room.seats < course.studentSize) -1 else 0
  }

  /**Soft:
   * The same subject should be taught in the same room
   */
  private fun roomStabilityPenalty(lecture: Lecture?):Int {
    return -roomsPerSubject!![lecture!!.subject]!!.size
  }

}