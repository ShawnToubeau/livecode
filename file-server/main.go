package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"os/user"
	"path/filepath"

	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/video/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization")

		// Extract the slug from the request URL
		slug := r.URL.Path[len("/video/"):]

		// Get the current user's home directory
		usr, err := user.Current()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Build the file path using the home directory
		filePath := filepath.Join(usr.HomeDir, "Desktop", "Algorave", slug+".mp4")

		file, err := os.Open(filePath)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer file.Close()

		// Set the content type to video/mp4
		w.Header().Set("Content-Type", "video/mp4")

		// Copy the file data to the response writer
		_, err = io.Copy(w, file)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})

	handler := cors.Default().Handler(mux)

	fmt.Println("server listening on 8080")
	// Start the server on port 8080
	http.ListenAndServe(":8080", handler)
}
