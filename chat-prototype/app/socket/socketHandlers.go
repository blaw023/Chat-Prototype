package socket

import (
	"fmt"
	"log"

	socketio "github.com/googollee/go-socket.io"
)

// Handles all websocket requests
func RegisterSocketHandlers(server *socketio.Server) {

	// Establishes the handshake connection between server and client
	server.OnConnect("/", func(s socketio.Conn) error {

		s.SetContext("")
		fmt.Println("connected:", s.ID())
		return nil
	})

	// Receives email message from client and returns a welcome message
	server.OnEvent("/", "email", func(s socketio.Conn, email string) string {
		s.SetContext(email)
		return "Hello there " + email + ". " + "I'm the Mount Sinai helper bot. How are you doing today?"
	})

	// Acknowledges a new message. (Maybe in the future can return response message related to incoming message)
	server.OnEvent("/", "new message", func(s socketio.Conn, msg string) string {
		s.Emit("recieved:", msg)
		return "Mount Sinai has received your messaage."
	})

	server.OnError("/", func(s socketio.Conn, err error) {
		log.Println("error:", err)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		log.Println("closed", reason)
	})
}
