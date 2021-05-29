package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gairTanm/sqlverse/db"
	"github.com/gairTanm/sqlverse/gql"
	"github.com/rs/cors"
)

func main() {
	d, err := db.Open("dbname=sqlverse_db sslmode=disable")
	if err != nil {
		panic(err)
	}
	defer d.Close()

	repo := db.NewRepository(d)

	mux := http.NewServeMux()
	mux.Handle("/", gql.NewPlaygroundHandler("/graphql"))
	mux.Handle("/graphql", gql.NewHandler(repo))
	handler := cors.Default().Handler(mux)
	port := ":8080"
	fmt.Fprintf(os.Stdout, "Server ready at http://localhost%s\n", port)
	fmt.Fprintln(os.Stderr, http.ListenAndServe(port, handler))
}
