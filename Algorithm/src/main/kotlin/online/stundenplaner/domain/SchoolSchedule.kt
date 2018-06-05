package online.stundenplaner.domain

import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty
import org.optaplanner.core.api.domain.solution.PlanningScore
import org.optaplanner.core.api.domain.solution.PlanningSolution
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore

@PlanningSolution
class SchoolSchedule {

  @get:ValueRangeProvider(id = "allPeriods")
  lateinit var periods: List<Period>

  lateinit var teachers: List<Teacher>

  @get:ValueRangeProvider(id = "allRooms")
  lateinit var rooms: List<Room>

  lateinit var courses: List<Course>

  lateinit var subjects: List<Subject>

  @get:PlanningEntityCollectionProperty
  lateinit var lectures: List<Lecture>

  @get:PlanningScore
  var score: HardSoftScore? = null

  fun fillRequiredTeachers() {
    teachers.forEach { teacher ->
      teacher.subjectSpecialisations.forEach { subject ->
       subject.requiredTeacher.add(teacher)
      }
    }
  }

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
