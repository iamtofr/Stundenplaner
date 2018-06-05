package online.stundenplaner.solver.scoreCalculator

import online.stundenplaner.domain.Lecture
import online.stundenplaner.domain.SchoolSchedule

interface BasicCalculator {
  fun resetWorkingSolution(schoolSchedule: SchoolSchedule)
  fun insert(lecture: Lecture)
  fun retract(lecture: Lecture)
  fun calculateSoftScore(): Int
  fun calculateHardScore(): Int
}
