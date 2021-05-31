package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gairTanm/sqlverse/db"
	"github.com/gairTanm/sqlverse/gql"
	"github.com/go-chi/chi/v5"
	//"github.com/rs/cors"
)

func main() {
	d, err := db.Open("dbname=sqlverse_db sslmode=disable")
	if err != nil {
		panic(err)
	}
	defer d.Close()

	repo := db.NewRepository(d)

	router := chi.NewRouter()

	router.Use(gql.Middleware(repo))

	srv:=handler.NewDefaultServer(gql.NewExecutableSchema(gql.Config{Resolvers: &gql.Resolver{Repository: repo}}))
	router.Handle("/", playground.Handler("Graphql", "/graphql"))
	router.Handle("/graphql", srv)

	//handler := cors.Default().Handler(mux)
	port := ":8080"
	fmt.Fprintf(os.Stdout, "Server ready at http://localhost%s\n", port)
	fmt.Fprintln(os.Stderr, http.ListenAndServe(port,  router))
}
