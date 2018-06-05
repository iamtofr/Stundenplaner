package online.stundenplaner.persistence

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonIdentityReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import org.apache.commons.lang3.builder.CompareToBuilder
import org.optaplanner.core.api.domain.lookup.PlanningId
import org.optaplanner.core.api.score.constraint.ConstraintMatch
import java.io.Serializable

var idCounter: Long = 0

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property="_id")
open class Persistable(
  @get:PlanningId var _id: String = idCounter++.toString()
) : Serializable, Comparable<Persistable> {

  /**
   * Used by the GUI to sort the [ConstraintMatch] list
   * by [ConstraintMatch.getJustificationList].
   * @param other never null
   * @return comparison
   */
  override fun compareTo(other: Persistable): Int {
    return CompareToBuilder()
      .append(javaClass.name, other.javaClass.name)
      .append(_id, other._id)
      .toComparison()
  }

  override fun toString(): String {
    return javaClass.name.replace(".*\\.".toRegex(), "") + "-" + _id
  }

}

open class FakePersistable(
  @JsonIgnore
  @get:PlanningId var _id: String = idCounter++.toString()
) : Serializable, Comparable<Persistable> {

  /**
   * Used by the GUI to sort the [ConstraintMatch] list
   * by [ConstraintMatch.getJustificationList].
   * @param other never null
   * @return comparison
   */
  override fun compareTo(other: Persistable): Int {
    return CompareToBuilder()
      .append(javaClass.name, other.javaClass.name)
      .append(_id, other._id)
      .toComparison()
  }

  override fun toString(): String {
    return javaClass.name.replace(".*\\.".toRegex(), "") + "-" + _id
  }

}
