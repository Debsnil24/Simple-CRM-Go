package main

import (
	"fmt"
	"log"

	"github.com/Debsnil24/Simple-CRM-Go.git/routes"
)

func main() {
	r := routes.Router()
	err := r.Run(":9000")
	if err != nil {
		log.Fatal("Error: Unable to start Webserver on port 9000", err)
	} else {
		fmt.Println("Started Server on port 9000")
	}
}