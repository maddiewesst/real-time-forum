package api

import (
	"encoding/json"
	"net/http"
	"net/mail"

	"real-time-forum/internal/config"
	"real-time-forum/internal/database"
	"real-time-forum/internal/models"

	uuid "github.com/gofrs/uuid"
	"golang.org/x/crypto/bcrypt"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	//Prevents the endpoint being called by other url paths
	if r.URL.Path != "/login" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	
	//Prevents all request types other than POST
	if r.Method != "POST" {
		http.Error(w, "405 method not allowed.", http.StatusMethodNotAllowed)
		return
	}

	//Opens the database
	db, err := database.OpenDB(config.Path)
	if err != nil {
		http.Error(w, "500 internal server error.", http.StatusInternalServerError)
		return
	}

	defer db.Close()

	//Stores the unmarshalled login data
	var loginData models.Login

	//Decodes the request body into the login struct
	//Returns a bad request if there's an error
	err = json.NewDecoder(r.Body).Decode(&loginData)
	if err != nil {
		http.Error(w, "400 bad request.", http.StatusBadRequest)
		return
	}

	//Parameter to search for user
	var param string

	//Checks whether the user logged in with an email or username
	if _, err := mail.ParseAddress(loginData.Data); err != nil {
		param = "username"
	} else {
		param = "email"
	}

	//Searches database for a matching user
	foundUser, err := database.FindUserByParam(config.Path, param, loginData.Data)
	if err != nil {
		http.Error(w, "500 internal server error.", http.StatusInternalServerError)
		return
	}

	//Compares the stored hash for the user and the provided password
	if err := bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(loginData.Password)); err != nil {
		http.Error(w, "500 internal server error.", http.StatusInternalServerError)
		return
	}

	//Removes expired cookie based on valid user login
	_, err = db.Exec(database.RemoveCookie, foundUser.Id)
	if err != nil {
		http.Error(w, "500 internal server error.", http.StatusInternalServerError)
		return
	}

	//Check for session cookie, and create one if it doesn't exist
	cookie, err := r.Cookie("session")
	if err != nil {
		//Generates the session uuid
		sessionId, err := uuid.NewV4()
		if err != nil {
			http.Error(w, "500 internal server error.", http.StatusInternalServerError)
			return
		}

		//Creates and sets the cookie
		cookie = &http.Cookie{
			Name: "session",
			Value: sessionId.String(),
			HttpOnly: true,
			Path: "/",
			MaxAge: config.CookieAge,
		}
		http.SetCookie(w, cookie)
	}

	//Inserts the cookie into the database
	_, err = db.Exec(database.AddSession, cookie.Value, foundUser.Id)
	if err != nil {
		http.Error(w, "500 internal server error.", http.StatusInternalServerError)
		return
	}
}