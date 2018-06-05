package online.stundenplaner.service

import org.optaplanner.core.api.domain.solution.PlanningSolution
import org.optaplanner.core.api.solver.Solver
import org.optaplanner.core.api.solver.SolverFactory
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import kotlin.concurrent.thread

private const val SOLVER_CONFIG = "online/stundenplaner/solver/curriculumCourseSolverConfig.xml"

/**
 * A service handling solving and watching a Solution_ problem
 * @param Solution_ the solution type, the class with the [PlanningSolution] annotation
 * @param consumer a [SolutionConsumer] this service will report the solution to.
 * @param numOfSolutions the amount of solutions to be calculated at the same time. Be wary if this number is higher than your amount of CPU cores!
 */
open class SolverController<Solution_>(
  private val consumer: SolutionConsumer<Solution_>,
  val numOfSolutions: Int = 1
) {

  val logger: Logger = LoggerFactory.getLogger(SolverController::class.java)
  private val currentBestSolutions: MutableList<Solution_?>

  private val solvers: List<Solver<Solution_>>

  init {
    solvers = List(numOfSolutions, { createSolver() })
    currentBestSolutions = MutableList(numOfSolutions, { null })

    solvers.forEachIndexed { i, solver -> registerForBestSolutionChanges(solver, i) }
  }

  private fun createSolver(): Solver<Solution_> {
    val solverFactory = SolverFactory.createFromXmlResource<Solution_>(SOLVER_CONFIG)
    return solverFactory.buildSolver()
  }

  private fun registerForBestSolutionChanges(solver: Solver<Solution_>, numOfSolution: Int) {
    solver.addEventListener {
      if (it.isEveryProblemFactChangeProcessed) {
        logger.info("New best score: ${it.newBestScore}")
        currentBestSolutions[numOfSolution] = it.newBestSolution
        consumer.consumeSolution(it.newBestSolution, numOfSolution)
      }
    }
  }

  /**
   * Solves a problem [numOfSolutions]-times.
   * Will call [SolutionConsumer.consumeSolution] for every new best solution and [SolutionConsumer.consumeFinalSolution] for every final solution.
   * @param problem a problem of type [Solution_]
   */
  fun solve(problem: Solution_) {
    solvers.forEachIndexed { i, solver ->
      thread(isDaemon = true) {
        val solution = solver.solve(problem)
        consumer.consumeFinalSolution(solution, i)
      }
    }
  }

  /**
   * An interface for a basic Solution Consumer class
   * @param Solution_ the solution type, the class with the [PlanningSolution] annotation
   */
  interface SolutionConsumer<Solution_> {
    /**
     * Consumes a Solution_ to do whatever with it.
     * @param solution the solution to be consumed
     * @param numOfSolution which solution is being consumed (default = 0)
     */
    fun consumeSolution(solution: Solution_, numOfSolution: Int = 0)

    /**
     * Consumes a Solution_ to do whatever with it.
     * This Solution_ will be the final one, solving is terminated hereafter.
     * @param solution the solution to be consumed
     * @param numOfSolution which solution is being consumed (default = 0)
     */
    fun consumeFinalSolution(solution: Solution_, numOfSolution: Int = 0)
  }
}
