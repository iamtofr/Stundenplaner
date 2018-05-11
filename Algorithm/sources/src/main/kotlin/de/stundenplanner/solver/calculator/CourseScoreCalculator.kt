package de.stundenplanner.solver.calculator

import de.stundenplanner.domain.*

object CourseScoreCalculator {

  private val coursePeriodsGapWeight: Int = 10
  private val maxOccurrencesPerDayWeight: Int = 10

  private const val targetLecturesPerDay: Int = 2

  internal fun calculateAndInsert(
    lecture: Lecture,
    scheduleCourse: Map<Course, Map<Period, ArrayList<Lecture>>>,
    subjectOccurrencesPerDay: Map<Subject, MutableMap<Day, Int>>
  ): Pair<Int, Int> {
    val courseSchedule = scheduleCourse[lecture.course]!!
    val lecturesInPeriodOfCourse = courseSchedule[lecture.period]!!

    val hardScore = calculateHardScore(lecturesInPeriodOfCourse)
    val softScore = calculateSoftScore(lecture, courseSchedule, subjectOccurrencesPerDay)

    lecturesInPeriodOfCourse.add(lecture)
    incrementOccurrences(subjectOccurrencesPerDay, lecture)

    return Pair(hardScore, softScore)
  }

  private fun incrementOccurrences(subjectOccurrencesPerDay: Map<Subject, MutableMap<Day, Int>>, lecture: Lecture) {
    val occurrencesPerDay = subjectOccurrencesPerDay[lecture.subject]!!
    val occurrencesSoFar = occurrencesPerDay[lecture.period!!.day]!!
    occurrencesPerDay[lecture.period!!.day] = occurrencesSoFar + 1
  }

  private fun calculateHardScore(lecturesInPeriodOfCourse: ArrayList<Lecture>): Int {
    return conflictingLecturesPenalty(lecturesInPeriodOfCourse)
  }

  /**
   * There should not be several lectures in the same period for the same course
   */
  private fun conflictingLecturesPenalty(lecturesInPeriod: ArrayList<Lecture>): Int {
    return lecturesInPeriod.size
  }

  private fun calculateSoftScore(lecture: Lecture, courseSchedule: Map<Period, ArrayList<Lecture>>, subjectOccurrencesPerDay: Map<Subject, MutableMap<Day, Int>>): Int {
    return periodGapPenalty(lecture, courseSchedule) * coursePeriodsGapWeight +
      maxOccurrencesPerDayPenalty(lecture, subjectOccurrencesPerDay) * maxOccurrencesPerDayWeight
  }

  /**
   * There is a penalty for an isolated lecture in the course's schedule
   */
  private fun periodGapPenalty(lecture: Lecture, courseSchedule: Map<Period, ArrayList<Lecture>>): Int {
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

  /**
   * There is a penalty for anything beyond the targetLecturesPerDay per subject, while the actual target amount is favored
   */
  private fun maxOccurrencesPerDayPenalty(lecture: Lecture, subjectOccurrencesPerDay: Map<Subject, MutableMap<Day, Int>>): Int {
    val subject = lecture.subject!!
    val day = lecture.period!!.day
    val occurrencesPerDay = subjectOccurrencesPerDay[subject]!![day]!!
    return when {
        occurrencesPerDay == targetLecturesPerDay -> 1
        occurrencesPerDay < targetLecturesPerDay -> 0
        else -> -occurrencesPerDay + 2
    }
  }


}