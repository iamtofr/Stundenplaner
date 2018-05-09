package de.stundenplanner.app

import de.stundenplanner.domain.CourseSchedule
import de.stundenplanner.persistence.CurriculumCourseExporter
import de.stundenplanner.persistence.CurriculumCourseImporter
import de.stundenplanner.swingui.CurriculumCoursePanel
import org.optaplanner.examples.common.app.CommonApp
import org.optaplanner.examples.common.persistence.AbstractSolutionExporter
import org.optaplanner.examples.common.persistence.AbstractSolutionImporter
import org.optaplanner.examples.common.swingui.SolutionPanel
import org.optaplanner.persistence.common.api.domain.solution.SolutionFileIO
import org.optaplanner.persistence.xstream.impl.domain.solution.XStreamSolutionFileIO

const val SOLVER_CONFIG = "de/stundenplanner/solver/curriculumCourseSolverConfig.xml"
const val DATA_DIR_NAME = "curriculumcourse"

fun main(args: Array<String>) {
    CommonApp.prepareSwingEnvironment()
    CurriculumCourseApp().init()
}

class CurriculumCourseApp
    : CommonApp<CourseSchedule>(
        "Course timetabling",
        "Official competition name: ITC 2007 track3 - Curriculum course scheduling\n\n" +
                "Assign lectures to periods and rooms.",
        SOLVER_CONFIG,
        DATA_DIR_NAME,
        CurriculumCoursePanel.LOGO_PATH) {

    override fun createSolutionPanel(): SolutionPanel<CourseSchedule>? {
        return CurriculumCoursePanel()
    }

    override fun createSolutionFileIO(): SolutionFileIO<CourseSchedule> {
        return XStreamSolutionFileIO(CourseSchedule::class.java)
    }

    override fun createSolutionImporters(): Array<AbstractSolutionImporter<*>> {
        return arrayOf(CurriculumCourseImporter())
    }

    override fun createSolutionExporter(): AbstractSolutionExporter<*>? {
        return CurriculumCourseExporter()
    }

}
