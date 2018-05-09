package de.stundenplanner.solver

import de.stundenplanner.domain.CourseSchedule
import de.stundenplanner.domain.Period
import org.apache.commons.lang3.builder.CompareToBuilder
import org.optaplanner.core.impl.heuristic.selector.common.decorator.SelectionSorterWeightFactory


class PeriodStrengthWeightFactory : SelectionSorterWeightFactory<CourseSchedule, Period> {

  override fun createSorterWeight(schedule: CourseSchedule, period: Period): PeriodStrengthWeight {
    var unavailablePeriodPenaltyCount = 0
    for ((_, period1) in schedule.unavailablePeriodPenaltyList!!)
      if (period1 == period)
        unavailablePeriodPenaltyCount++

    return PeriodStrengthWeight(period, unavailablePeriodPenaltyCount)
  }

  data class PeriodStrengthWeight(private val period: Period, private val unavailablePeriodPenaltyCount: Int)
    : Comparable<PeriodStrengthWeight> {

    override fun compareTo(other: PeriodStrengthWeight): Int =
      CompareToBuilder()
        // The higher unavailablePeriodPenaltyCount, the weaker
        .append(other.unavailablePeriodPenaltyCount, unavailablePeriodPenaltyCount) // Descending
        .append(period.day.dayIndex, other.period.day.dayIndex)
        .append(period.timeSlot.timeSlotIndex, other.period.timeSlot.timeSlotIndex)
        .append(period.id, other.period.id)
        .toComparison()

  }

}
