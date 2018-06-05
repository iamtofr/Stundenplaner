package online.stundenplaner.solver.scoreCalculator.entityCalculators

import online.stundenplaner.domain.*
import online.stundenplaner.solver.scoreCalculator.EntityScoreCalculator

class TeacherScoreCalculator(day: Day) : EntityScoreCalculator(day) {

  private val periodsGapWeight: Int = 10

  override fun insertMove(lecture: Lecture) {
    val lecturesInPeriodOfCourse = schedule[lecture.period!!.timeSlot]
    lecturesInPeriodOfCourse.add(lecture)
  }

  override fun retractMove(lecture: Lecture) {
    val lecturesInPeriodOfCourse = schedule[lecture.period!!.timeSlot]
    lecturesInPeriodOfCourse.remove(lecture)
  }

  override fun calculateHardScoreBeforeMove(lecture: Lecture): Int {
    return conflictingLecturesPenalty(lecture)
  }

  /**Hard:
   * There should not be several lectures in the same period for the same room
   */
  private fun conflictingLecturesPenalty(lecture: Lecture): Int {
    val lecturesInPeriodInTeacher = schedule[lecture.period!!.timeSlot]
    return -lecturesInPeriodInTeacher.size
  }

  override fun calculateSoftScoreAfterMove(lecture: Lecture): Int {
    return periodGapPenalty(lecture) * periodsGapWeight
  }

  /**Soft:
   * There is a penalty for an isolated lecture in the teacher's schedule
   */
  private fun periodGapPenalty(lecture: Lecture): Int {
    val timeSlot = lecture.period!!.timeSlot

    val firstPossibleEmptyTimeSlotBefore = timeSlot - 1
    val firstPossibleEmptyTimeSlotAfter = timeSlot + 1

    val usedTimeSlotBefore = closestLectureInRange(firstPossibleEmptyTimeSlotBefore..0)
    val usedTimeSlotAfter = closestLectureInRange(firstPossibleEmptyTimeSlotAfter until schedule.size)

    return if (usedTimeSlotBefore != null && usedTimeSlotAfter != null) 1
    else if (usedTimeSlotBefore != null) usedTimeSlotBefore.period!!.timeSlot - firstPossibleEmptyTimeSlotBefore
    else if (usedTimeSlotAfter != null) firstPossibleEmptyTimeSlotAfter - usedTimeSlotAfter.period!!.timeSlot
    else 0
  }

  private fun closestLectureInRange(range: IntRange): Lecture? {
    if (range.first < 0 || range.last > schedule.size) return null

    for (i in range)
      if (schedule[i].size > 0) return schedule[i].first()
    return null
  }

}
