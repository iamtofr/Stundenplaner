package online.stundenplaner.domain

import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty
import org.optaplanner.core.api.domain.solution.PlanningScore
import org.optaplanner.core.api.domain.solution.PlanningSolution
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore

/**
 * This problem's [PlanningSolution].
 * Contains all known Periods, teachers, rooms, courses, subjects and lectures of a school and is used to distribute the lectures.
 */
@PlanningSolution
class SchoolSchedule {

  /**
   * Every period at this school
   */
  @get:ValueRangeProvider(id = "allPeriods")
  lateinit var periods: List<Period>

  /**
   * Every teacher at this school
   */
  lateinit var teachers: List<Teacher>

  /**
   * Every room at this school
   */
  @get:ValueRangeProvider(id = "allRooms")
  lateinit var rooms: List<Room>

  /**
   * Every course (=class) at this school
   */
  lateinit var courses: List<Course>

  /**
   * Every subject taught at this school
   */
  lateinit var subjects: List<Subject>

  /**
   * Every lecture hold at this school.
   * If this is not given, [fillLectures] has to be called
   */
  @get:PlanningEntityCollectionProperty
  lateinit var lectures: List<Lecture>

  /**
   * The [PlanningScore] of this problem
   */
  @get:PlanningScore
  var score: HardSoftScore? = null

  /**
   * Needs to be called after every teacher and subject is injected, will populate subjects' [Subject.requiredTeacher]
   */
  fun fillRequiredTeachers() {
    teachers.forEach { teacher ->
      teacher.subjectSpecialisations.forEach { subject ->
       subject.requiredTeacher.add(teacher)
      }
    }
  }

  /**
   * Creates every possible lecture based on [courses], [subjects] and [Subject.occurrences]
   */
  fun fillLectures() {
    val subjectsTimesOccurrences = subjects.map { List(it.occurrences, { _ -> it }) }.flatten()
    lectures = courses
      .map { it to subjectsTimesOccurrences }
      .flatMap { (course, subjects) ->
        subjects.map { course to it }
      }
      .map { (course, subject) -> Lecture(course, subject) }
  }
}
