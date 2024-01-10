package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
	"sync"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)


type ScoreboardEntry struct {
    Username  string `json:"username"`
    Score int    `json:"score"`
}

var (
    scoreboard []ScoreboardEntry
    mutex      sync.Mutex
)

func AddScore(w http.ResponseWriter, r *http.Request) {
    var entry ScoreboardEntry
    err := json.NewDecoder(r.Body).Decode(&entry)
    if err != nil {
        http.Error(w, "Invalid JSON format", http.StatusBadRequest)
        return
    }
    mutex.Lock()
    scoreboard = append(scoreboard, entry)
    sort.Slice(scoreboard, func(i, j int) bool {
        return scoreboard[i].Score > scoreboard[j].Score
    })
    mutex.Unlock()

    jsonData, err := json.Marshal(scoreboard)
    if err != nil {
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Write(jsonData)
}



func GetScoreboard(w http.ResponseWriter, r *http.Request) {
    mutex.Lock()
    defer mutex.Unlock()
    jsonData, err := json.Marshal(scoreboard)
    if err != nil {
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }
    w.Header().Set("Content-Type", "application/json")
    w.Write(jsonData)
}


func main() {
    r := mux.NewRouter()

    r.HandleFunc("/addscore", AddScore).Methods("POST")
	r.HandleFunc("/getscoreboard", GetScoreboard).Methods("GET")


    // nécessaire pour éviter l'erreur CORS
    headers := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})
    origins := handlers.AllowedOrigins([]string{"http://127.0.0.1:5500"})
    methods := handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"})

    server := &http.Server{
        Addr:    ":8080",
        Handler: handlers.CORS(headers, origins, methods)(r),
    }

    fmt.Println("Server listening on :8080...")
    log.Fatal(server.ListenAndServe())
}
