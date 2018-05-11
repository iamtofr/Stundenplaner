package de.stundenplanner.domain

import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty
import org.optaplanner.core.api.domain.solution.PlanningScore
import org.optaplanner.core.api.domain.solution.PlanningSolution
import org.optaplanner.core.api.domain.solution.drools.ProblemFactCollectionProperty
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore

@PlanningSolution
class CourseSchedule : Persistable() {

  @get:ValueRangeProvider(id = "allPeriods")
  var periods: List<Period>? = null

  @get:ValueRangeProvider(id = "allTeachers")
  var teachers: List<Teacher>? = null

  @get:ValueRangeProvider(id = "allRooms")
  var rooms: List<Room>? = null

  var courses: List<Course>? = null

  var subjects: List<Subject>? = null

  @get:PlanningEntityCollectionProperty
  var lectures: List<Lecture>? = null

  @get:PlanningScore
  var score: HardSoftScore? = null

//  @ProblemFactCollectionProperty
//  private fun calculateCourseConflictList(): List<CourseConflict> {
//    val courseConflictList = ArrayList<CourseConflict>()
//
//    courses!!
//      .forEach { leftCourse ->
//        courses!!
//          .filter { rightCourse -> leftCourse.id >= rightCourse.id }
//          .forEach { rightCourse ->
//            var conflictCount = 0
//            if (leftCourse.teacher == rightCourse.teacher)
//              conflictCount++
//
//            for (curriculum in leftCourse.curriculumList)
//              if (rightCourse.curriculumList.contains(curriculum))
//                conflictCount++
//
//            if (conflictCount > 0)
//              courseConflictList.add(CourseConflict(leftCourse, rightCourse, conflictCount))
//          }
//      }
//
//    return courseConflictList
//  }

}
