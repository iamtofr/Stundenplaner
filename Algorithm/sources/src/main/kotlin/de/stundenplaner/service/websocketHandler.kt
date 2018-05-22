package main.kotlin.de.stundenplaner.service


import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.eclipse.jetty.websocket.api.Session
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage
import org.eclipse.jetty.websocket.api.annotations.WebSocket
import spark.Spark.*


fun main(args: Array<String>) {
  port(9000)
//    staticFileLocation("/public")
//    webSocket("/chat", ChatWSHandler::class.java)
  webSocket("/api.stundenplaner.online", ChatWSHandler::class.java)
  init()
}

class Message(val msgType: String, val data: Any)

@WebSocket
class WebsocketHandler {


  @OnWebSocketConnect
  fun connected(session: Session) {
    println("connection created")
    emit(session, Message("connectionStatus", "algorithmServerReady"))
  }

  @OnWebSocketMessage
  fun message(session: Session, message: String) {
    val json = ObjectMapper().readTree(message)
    println("messege from server ${message}")
    //{type: "join/say", data: "name/msg"}
    when (json.get("msgType").asText()) {
      "getLectures" -> {
        val schoolData = json.get("data").asText()
        println(schoolData)

        emit(session, Message("scheduleData", "{\"id\":3,\"grade\":5,\"letter\":\"A\",\"studentSize\":25}"))

      }
      "msgError" -> {
        println("error ${message}")

      }

    }

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


  fun emit(session: Session, message: Message) = session.remote.sendString(jacksonObjectMapper().writeValueAsString(message))
//    fun broadcast(message: Message) = users.forEach() { emit(it.key, message) }
//    fun broadcastToOthers(session: Session, message: Message) = users.filter { it.key != session }.forEach() { emit(it.key, message)}

}