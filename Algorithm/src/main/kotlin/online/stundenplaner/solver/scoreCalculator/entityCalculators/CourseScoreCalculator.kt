package online.stundenplaner.solver.scoreCalculator.entityCalculators

import online.stundenplaner.domain.*
import online.stundenplaner.solver.scoreCalculator.EntityScoreCalculator


class CourseScoreCalculator(day: Day) : EntityScoreCalculator(day) {

  private val targetLecturesPerDay = 2
  private val periodsGapWeight: Int = 10
  private val maxOccurrencesPerDayWeight: Int = 10

  private lateinit var subjectOccurrences: Map<Subject, MutableList<Lecture>>
  private val maxDistanceToOtherLectures = targetLecturesPerDay - 1

  override fun resetWorkingSolution(schoolSchedule: SchoolSchedule) {
    super.resetWorkingSolution(schoolSchedule)
    subjectOccurrences = schoolSchedule.subjects.associate { it to ArrayList<Lecture>() }
  }

  override fun insertMove(lecture: Lecture) {
    val lecturesInPeriod = schedule[lecture.period!!.timeSlot]
    val subjectOccurrences = subjectOccurrences[lecture.subject]!!
    lecturesInPeriod.add(lecture)
    subjectOccurrences.add(lecture)
  }

  override fun retractMove(lecture: Lecture) {
    val lecturesInPeriod = schedule[lecture.period!!.timeSlot]
    val subjectOccurrences = subjectOccurrences[lecture.subject]!!
    lecturesInPeriod.remove(lecture)
    subjectOccurrences.remove(lecture)
  }

  override fun calculateHardScoreBeforeMove(lecture: Lecture): Int {
    return conflictingLecturesPenalty(lecture)
  }

  /**Hard:
   * There should not be several lectures in the same period for the same course
   */
  private fun conflictingLecturesPenalty(lecture: Lecture): Int {
    val lecturesInPeriodInCourse = schedule[lecture.period!!.timeSlot]
    return -lecturesInPeriodInCourse.size
  }

  override fun calculateSoftScoreBeforeMove(lecture: Lecture): Int {
    return subjectCompactnessPerDay(lecture) * maxOccurrencesPerDayWeight
  }

  /**Soft:
   * There is a penalty if two lectures of the same subject are not consecutive or there are more than 2 lectures per day
   */
  private fun subjectCompactnessPerDay(lecture: Lecture): Int {
    val timeSlot = lecture.period!!.timeSlot
    val occurringLecturesThisDay = subjectOccurrences[lecture.subject]!!
    val usedTimeSlots = occurringLecturesThisDay.map { it.period!!.timeSlot }
    val transformedTimeSlots = usedTimeSlots.map { Math.abs(it - timeSlot) }
    return -transformedTimeSlots.filter { it > maxDistanceToOtherLectures }.size
  }

  override fun calculateSoftScoreAfterMove(lecture: Lecture): Int {
    return periodGapPenalty(lecture) * periodsGapWeight
  }

  /**Soft:
   * There is a penalty for an isolated lecture in the course's schedule
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
