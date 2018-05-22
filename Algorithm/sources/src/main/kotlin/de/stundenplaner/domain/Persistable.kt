package de.stundenplaner.domain

import org.apache.commons.lang3.builder.CompareToBuilder
import org.optaplanner.core.api.domain.lookup.PlanningId
import org.optaplanner.core.api.score.constraint.ConstraintMatch
import org.optaplanner.examples.common.domain.AbstractPersistable
import java.io.Serializable

var idCounter: Long = 0

open class Persistable: Serializable, Comparable<AbstractPersistable> {

  @get:PlanningId
  var id: Long

  protected constructor() {
    id = idCounter++
  }

  protected constructor(id: Long) {
    this.id = id
  }

  /**
   * Used by the GUI to sort the [ConstraintMatch] list
   * by [ConstraintMatch.getJustificationList].
   * @param other never null
   * @return comparison
   */
  override fun compareTo(other: AbstractPersistable): Int {
    return CompareToBuilder()
      .append(javaClass.name, other.javaClass.name)
      .append(id, other.id)
      .toComparison()
  }

  override fun toString(): String {
    return javaClass.name.replace(".*\\.".toRegex(), "") + "-" + id
  }

}
