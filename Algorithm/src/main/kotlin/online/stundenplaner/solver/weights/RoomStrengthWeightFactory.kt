package online.stundenplaner.solver.weights

import online.stundenplaner.domain.SchoolSchedule
import online.stundenplaner.domain.Room
import org.apache.commons.lang3.builder.CompareToBuilder
import org.optaplanner.core.impl.heuristic.selector.common.decorator.SelectionSorterWeightFactory

class RoomStrengthWeightFactory : SelectionSorterWeightFactory<SchoolSchedule, Room> {

  override fun createSorterWeight(schedule: SchoolSchedule, room: Room): RoomStrengthWeight =
    RoomStrengthWeight(room)

  data class RoomStrengthWeight(private val room: Room) : Comparable<RoomStrengthWeight> {

    override fun compareTo(other: RoomStrengthWeight): Int =
      CompareToBuilder()
        .append(room.seats, other.room.seats)
        .append(room._id, other.room._id)
        .toComparison()
  }

}
