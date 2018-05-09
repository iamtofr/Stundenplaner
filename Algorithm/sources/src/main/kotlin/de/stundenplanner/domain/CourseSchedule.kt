package de.stundenplanner.domain

import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty
import org.optaplanner.core.api.domain.solution.PlanningScore
import org.optaplanner.core.api.domain.solution.PlanningSolution
import org.optaplanner.core.api.domain.solution.drools.ProblemFactCollectionProperty
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore

@PlanningSolution
class CourseSchedule : Persistable() {

  var name: String = "default"

  @get:ValueRangeProvider(id = "allTeachers")
  @get:ProblemFactCollectionProperty
  var teacherList: List<Teacher>? = null

  @get:ProblemFactCollectionProperty
  var courseList: List<Course>? = null

  @get:ValueRangeProvider(id = "allPeriods")
  @get:ProblemFactCollectionProperty
  var periodList: List<Period>? = null

  @get:ValueRangeProvider(id = "allRooms")
  @get:ProblemFactCollectionProperty
  var roomList: List<Room>? = null

  @get:PlanningEntityCollectionProperty
  var lectureList: List<Lecture>? = null

//  @XStreamConverter(HardSoftScoreJacksonJsonSerializer::class)
  @get:PlanningScore
  var score: HardSoftScore? = null

//  @ProblemFactCollectionProperty
//  private fun calculateCourseConflictList(): List<CourseConflict> {
//    val courseConflictList = ArrayList<CourseConflict>()
//
//    courseList!!
//      .forEach { leftCourse ->
//        courseList!!
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
