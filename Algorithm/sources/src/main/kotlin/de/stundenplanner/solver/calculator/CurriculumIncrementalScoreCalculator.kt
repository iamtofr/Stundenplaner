package de.stundenplanner.solver.calculator

import de.stundenplanner.domain.*
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore
import org.optaplanner.core.impl.score.director.incremental.AbstractIncrementalScoreCalculator

object CurriculumIncrementalScoreCalculator : AbstractIncrementalScoreCalculator<CourseSchedule>() {
  private var scheduleTeacher: Map<Teacher, Map<Period, ArrayList<Lecture>>> = LinkedHashMap()
  private var scheduleRoom: Map<Room, Map<Period, ArrayList<Lecture>>> = LinkedHashMap()
  private var scheduleCourse: Map<Course, Map<Period, ArrayList<Lecture>>> = LinkedHashMap()
  private var subjectOccurrencesPerDay: Map<Subject, MutableMap<Day, Int>> = LinkedHashMap()

  private var hardScore: Int = 0
  private var softScore: Int = 0

  override fun resetWorkingSolution(schedule: CourseSchedule) {
    val periods = schedule.periods!!
    val teachers = schedule.teachers!!
    val rooms = schedule.rooms!!
    val courses = schedule.courses!!
    val lectures = schedule.lectures!!
    val subjects = schedule.subjects!!

    scheduleTeacher = teachers
      .associate { teacher -> teacher to periods.associate { period -> period to ArrayList<Lecture>() } }
    scheduleRoom = rooms
      .associate { room -> room to periods.associate { period -> period to ArrayList<Lecture>() } }
    scheduleCourse = courses
      .associate { course -> course to periods.associate { period -> period to ArrayList<Lecture>() } }
    subjectOccurrencesPerDay = subjects
      .associate { subject -> subject to Day.DAYS.associateTo(HashMap<Day, Int>(), { day -> day to 0 }) }

    hardScore = 0
    softScore = 0

    lectures.forEach { lecture -> insert(lecture) }
  }

  private fun insert(lecture: Lecture) {
    val (teacherHardScore, teacherSoftScore) =
      TeacherScoreCalculator.calculateAndInsert(lecture, scheduleTeacher)
    val (roomHardScore, roomSoftScore) =
      RoomScoreCalculator.calculateAndInsert(lecture, scheduleRoom)
    val (courseHardScore, courseSoftScore) =
      CourseScoreCalculator.calculateAndInsert(lecture, scheduleCourse, subjectOccurrencesPerDay)

    hardScore += teacherHardScore + roomHardScore + courseHardScore
    softScore += teacherSoftScore + roomSoftScore + courseSoftScore
  }


  override fun beforeEntityAdded(lecture: Any) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun afterEntityAdded(lecture: Any) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun beforeVariableChanged(lecture: Any, variableName: String) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun afterVariableChanged(lecture: Any, variableName: String) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun beforeEntityRemoved(lecture: Any) {
  }

  override fun afterEntityRemoved(lecture: Any) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun calculateScore(): HardSoftScore = HardSoftScore.valueOf(hardScore, softScore)

}