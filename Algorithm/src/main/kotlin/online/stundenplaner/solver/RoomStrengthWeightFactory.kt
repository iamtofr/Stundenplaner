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

package online.stundenplaner.solver

import online.stundenplaner.domain.CourseSchedule
import online.stundenplaner.domain.Room
import org.apache.commons.lang3.builder.CompareToBuilder
import org.optaplanner.core.impl.heuristic.selector.common.decorator.SelectionSorterWeightFactory

class RoomStrengthWeightFactory : SelectionSorterWeightFactory<CourseSchedule, Room> {

  override fun createSorterWeight(schedule: CourseSchedule, room: Room): RoomStrengthWeight =
    RoomStrengthWeight(room)

  data class RoomStrengthWeight(private val room: Room) : Comparable<RoomStrengthWeight> {

    override fun compareTo(other: RoomStrengthWeight): Int =
      CompareToBuilder()
        .append(room.seats, other.room.seats)
        .append(room.id, other.room.id)
        .toComparison()

  }

}
