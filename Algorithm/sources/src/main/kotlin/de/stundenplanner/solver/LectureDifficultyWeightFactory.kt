/*
 * Copyright 2010 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package de.stundenplanner.solver

import de.stundenplanner.domain.Course
import de.stundenplanner.domain.CourseSchedule
import de.stundenplanner.domain.Lecture
import org.apache.commons.lang3.builder.CompareToBuilder
import org.optaplanner.core.impl.heuristic.selector.common.decorator.SelectionSorterWeightFactory

class LectureDifficultyWeightFactory : SelectionSorterWeightFactory<CourseSchedule, Lecture> {

  override fun createSorterWeight(schedule: CourseSchedule, lecture: Lecture): LectureDifficultyWeight {
    val course:Course = lecture.course!!
    var unavailablePeriodPenaltyCount = 0

    for (penalty in schedule.unavailablePeriodPenaltyList!!)
      if (penalty.course == course) unavailablePeriodPenaltyCount++

    return LectureDifficultyWeight(lecture, unavailablePeriodPenaltyCount)
  }

  class LectureDifficultyWeight(private val lecture: Lecture, private val unavailablePeriodPenaltyCount: Int) : Comparable<LectureDifficultyWeight> {

    override fun compareTo(other: LectureDifficultyWeight): Int {
      val course = lecture.course
      val otherCourse = other.lecture.course
      return CompareToBuilder()
        .append(course!!.curriculumList.size, otherCourse!!.curriculumList.size)
        .append(unavailablePeriodPenaltyCount, other.unavailablePeriodPenaltyCount)
        .append(course.lectureSize, otherCourse.lectureSize)
        .append(course.studentSize, otherCourse.studentSize)
        .append(course.minWorkingDaySize, otherCourse.minWorkingDaySize)
        .append(lecture.id, other.lecture.id)
        .toComparison()
    }

  }

}
