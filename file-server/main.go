package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/video/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization")

		// extract slug from the request
		slug := r.URL.Path[len("/video/"):]

		currentDir, err := os.Getwd()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// build filepath to video files
		filePath := filepath.Join(currentDir, "..", "visuals", slug+".mp4")

		file, err := os.Open(filePath)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer func(file *os.File) {
			err := file.Close()
			if err != nil {
				panic("failed to close file")
			}
		}(file)

		// set content type
		w.Header().Set("Content-Type", "video/mp4")

		// copy the file data to the response writer
		_, err = io.Copy(w, file)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})

	mux.HandleFunc("/img/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization")

		// extract slug from the request
		slug := r.URL.Path[len("/img/"):]

		currentDir, err := os.Getwd()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// build filepath to video files
		filePath := filepath.Join(currentDir, "..", "visuals", slug+".jpg")

		file, err := os.Open(filePath)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer func(file *os.File) {
			err := file.Close()
			if err != nil {
				panic("failed to close file")
			}
		}(file)

		// set content type
		w.Header().Set("Content-Type", "image/jpeg")

		// copy the file data to the response writer
		_, err = io.Copy(w, file)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})

	handler := cors.Default().Handler(mux)

	fmt.Println("server listening on 8082")
	err := http.ListenAndServe(":8082", handler)
	if err != nil {
		panic("failed to start server")
	}
}
