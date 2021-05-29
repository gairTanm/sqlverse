package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gairTanm/sqlverse/gqlgen"
	"github.com/gairTanm/sqlverse/pg"
	"github.com/rs/cors"
)

func main() {
	db, err := pg.Open("dbname=sqlverse_db sslmode=disable")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	repo := pg.NewRepository(db)

	mux := http.NewServeMux()
	mux.Handle("/", gqlgen.NewPlaygroundHandler("/graphql"))
	mux.Handle("/graphql", gqlgen.NewHandler(repo))
	handler := cors.Default().Handler(mux)
	port := ":8080"
	fmt.Fprintf(os.Stdout, "Server ready at http://localhost%s\n", port)
	fmt.Fprintln(os.Stderr, http.ListenAndServe(port, handler))
}
