package de.stundenplaner.solver.calculator

import de.stundenplaner.domain.*

private const val targetLecturesPerDay: Int = 2

class CourseScoreCalculator : BasicScoreCalculator<Course>() {

  private val coursePeriodsGapWeight: Int = 10
  private val maxOccurrencesPerDayWeight: Int = 10

  private var subjectOccurrencesPerDay: Map<Subject, MutableMap<Day, Int>>? = null

  override fun resetWorkingSolution(
    scheduleOwners: List<Course>?, periods: List<Period>?, lectures: List<Lecture>?, mainSchedule: CourseSchedule?
  ) {
    schedule = scheduleOwners!!
      .associate { it to periods!!.associate { it to ArrayList<Lecture>() } }
    subjectOccurrencesPerDay = mainSchedule!!.subjects!!
      .associate { it to Day.DAYS.associateTo(HashMap<Day, Int>(), { it to 0 }) }

    lectures!!.forEach { insert(it) }
  }

  override fun insertMove(lecture: Lecture?) {
    val lecturesInPeriodOfCourse = schedule!![lecture!!.course]!![lecture.period]!!
    lecturesInPeriodOfCourse.add(lecture)
    addToOccurrences(lecture, 1)
  }

  override fun retractMove(lecture: Lecture?) {
    val lecturesInPeriodOfCourse = schedule!![lecture!!.course]!![lecture.period]!!
    lecturesInPeriodOfCourse.add(lecture)
    addToOccurrences(lecture, -1)
  }

  override fun calculateHardScoreOfMove(lecture: Lecture?): Int {
    return conflictingLecturesPenalty(lecture)
  }

  override fun calculateSoftScoreOfMove(lecture: Lecture?): Int {
    return periodGapPenalty(lecture) * coursePeriodsGapWeight +
      maxOccurrencesPerDayPenalty(lecture) * maxOccurrencesPerDayWeight
  }

  private fun addToOccurrences(lecture: Lecture?, n: Int) {
    val occurrencesPerDay = subjectOccurrencesPerDay!![lecture!!.subject]!!
    val occurrencesSoFar = occurrencesPerDay[lecture.period!!.day]!!
    occurrencesPerDay[lecture.period!!.day] = occurrencesSoFar + n
  }

    /**Hard:
     * There should not be several lectures in the same period for the same course
     */
    private fun conflictingLecturesPenalty(lecture: Lecture?): Int {
      val lecturesInPeriodInCourse = schedule!![lecture!!.course]!![lecture.period]!!
      return lecturesInPeriodInCourse.size
    }

  /**Soft:
   * There is a penalty for an isolated lecture in the course's schedule
   */
  private fun periodGapPenalty(lecture: Lecture?): Int {
    val courseSchedule = schedule!![lecture!!.course]!!
    val period = lecture.period!!
    val day = period.day
    val periodBefore = day.periods[period.timeSlot - 1]
    val periodAfter = day.periods[period.timeSlot + 1]

    val thereIsALectureBefore = courseSchedule[periodBefore]!!.size > 0
    val thereIsALectureAfter = courseSchedule[periodAfter]!!.size > 0

    return when {
      thereIsALectureBefore && thereIsALectureAfter -> 2
      thereIsALectureBefore || thereIsALectureAfter -> 0
      else -> -2
    }
  }

  /**Soft:
   * There is a penalty for anything beyond the targetLecturesPerDay per subject, while the actual target amount is favored
   */
  private fun maxOccurrencesPerDayPenalty(lecture: Lecture?): Int {
    val subject = lecture!!.subject!!
    val day = lecture.period!!.day
    val occurrencesPerDay = subjectOccurrencesPerDay!![subject]!![day]!!
    return when {
      occurrencesPerDay == targetLecturesPerDay -> 1
      occurrencesPerDay < targetLecturesPerDay -> 0
      else -> -occurrencesPerDay + 2
    }
  }


}