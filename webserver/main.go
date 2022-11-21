package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./dist/"))
	http.Handle("/", fs)

	log.Println("Starting webserver on :8081")

	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatal(err)
	}
}
