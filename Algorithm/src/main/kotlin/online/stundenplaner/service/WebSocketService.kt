package online.stundenplaner.service

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import online.stundenplaner.domain.Curriculum
import online.stundenplaner.domain.SchoolSchedule
import org.eclipse.jetty.websocket.api.Session
import org.eclipse.jetty.websocket.api.annotations.*
import spark.Spark
import java.io.File


const val port = 9000
const val path = "/api.stundenplaner.online"

fun main(args: Array<String>) {
  Spark.port(port)
  Spark.webSocket(path, WebSocketController::class.java)
  Spark.init()
}

/**
 * Message wrapper for socket communication, allows specifying a msgType.
 * @property msgType type of this message
 * @property data the package of this message
 * @constructor Creates a new message object.
 */
class Message(val msgType: String, val data: Any?)

/**
 * Controller class for a WebSocket connection.
 * Implements @OnWebSocketConnect, @OnWebSocketMessage and @OnWebSocketError.
 * Passes the
 */
@WebSocket
class WebSocketController {
  private val mapper = jacksonObjectMapper()

  init {
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
  }

  @OnWebSocketConnect
  fun connected(session: Session) {
    println("connection created")
    emit(session, Message("connectionStatus", "algorithmServerReady"))
  }

  @OnWebSocketMessage
  fun message(session: Session, incomingString: String) {
    val message = mapper.readTree(incomingString)
    println("message received: $message")

    when (message["msgType"].asText()) {
      "getLectures" -> handleSchoolData(session, asSchoolSchedule(message["data"]))
      "msgError" -> println("error $message")
    }
  }

  private fun asSchoolSchedule(node: JsonNode):SchoolSchedule = mapper.treeToValue(node, SchoolSchedule::class.java)

  private fun handleSchoolData(session: Session, courseSchedule: SchoolSchedule) {
    courseSchedule.fillLectures()
    courseSchedule.fillRequiredTeachers()

    val solverController = SolverController(ScheduleConsumer({message -> emit(session, message) }, mapper))

    solverController.solve(courseSchedule)
  }


  @OnWebSocketClose
  fun disconnect(session: Session, code: Int, reason: String?) = println("${session.remote} disconnected.")

  @OnWebSocketError
  fun error(session: Session, err: Throwable) = println(err)

  private fun emit(session: Session, message: Message) = session.remote.sendString(mapper.writeValueAsString(message))

  class ScheduleConsumer(private val returnFunction: (Message) -> Unit, val mapper:ObjectMapper) : SolverController.SolutionConsumer<SchoolSchedule> {
    override fun consumeSolution(solution: SchoolSchedule, numOfSolution: Int) {
//      mapper.writeValue(File("Algorithm/results/result$port$numOfSolution.json"), solution.lectures)
      returnFunction(Message("scheduleData", Curriculum(0, solution.lectures)))
    }

    override fun consumeFinalSolution(solution: SchoolSchedule, numOfSolution: Int) {
//      mapper.writeValue(File("finalresult$port$numOfSolution.json"), solution.lectures)
//      returnFunction(Message("scheduleData", solution.score))
      returnFunction(Message("scheduleData", Curriculum(0, solution.lectures)))
      returnFunction( Message("end", null))
    }
  }
}
