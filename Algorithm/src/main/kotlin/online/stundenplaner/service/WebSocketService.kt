package online.stundenplaner.service

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
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

class Message(val msgType: String, val data: Any?)

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
      "getLectures" -> handleSchoolData(session, message["data"].asText())
      "msgError" -> println("error $message")
    }
  }

  private fun handleSchoolData(session: Session, string: String) {
    val courseSchedule = mapper.readValue<SchoolSchedule>(string)

    courseSchedule.fillLectures()
    courseSchedule.fillRequiredTeachers()

    val solverController = SolverController(ScheduleConsumer(session))

    solverController.solve(courseSchedule)
//    emit(session, Message("scheduleData", courseSchedule))
  }

  @OnWebSocketClose
  fun disconnect(session: Session, code: Int, reason: String?) {
    // remove the user from our list
//        val user = users.remove(session)
    // notify all other users this user has disconnected
//        if (user != null) broadcast(Message("left", user))
//        if (user != null) {
//            println("left msg ${user.name}")
//        }
  }

  @OnWebSocketError
  fun error(session: Session, err: Throwable) {
    println(err)
  }

  private fun emit(session: Session, message: Message) = session.remote.sendString(mapper.writeValueAsString(message))
//    fun broadcast(message: Message) = users.forEach() { emit(it.key, message) }
//    fun broadcastToOthers(session: Session, message: Message) = users.filter { it.key != session }.forEach() { emit(it.key, message)}

  class ScheduleConsumer(private val session: Session) : SolverController.SolutionConsumer<SchoolSchedule> {
    private val mapper = jacksonObjectMapper()
    private fun emit(session: Session, message: Message) = session.remote.sendString(mapper.writeValueAsString(message))

    override fun consumeSolution(solution: SchoolSchedule, numOfSolution: Int) {
      mapper.writeValue(File("result$port$numOfSolution.json"), solution.lectures)
//      emit(session, Message("scheduleData", solution.lectures))
    }

    override fun consumeFinalSolution(solution: SchoolSchedule, numOfSolution: Int) {
      mapper.writeValue(File("finalresult$port$numOfSolution.json"), solution.lectures)
      emit(session, Message("scheduleData", solution.score))
      emit(session, Message("scheduleData", solution.lectures))
      emit(session, Message("end", null))
    }
  }
}