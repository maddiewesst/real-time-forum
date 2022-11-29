package api

import (
	"log"
	"net/http"
)

//Sets up the router with endpoints and starts the server
func StartServer() {
	mux := http.NewServeMux()

	mux.HandleFunc("/login", LoginHandler)
	mux.HandleFunc("/logout", LogoutHandler)
	mux.HandleFunc("/register", RegisterHandler)
	mux.HandleFunc("/user", UserHandler)
	mux.HandleFunc("/post", PostHandler)
	mux.HandleFunc("/message", MessageHandler)
	mux.HandleFunc("/comment", CommentHandler)
	mux.HandleFunc("/like", LikeHandler)

	if err := http.ListenAndServe(":8000", mux); err != nil {
		log.Fatal(err)
	}
}