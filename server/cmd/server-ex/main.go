package main

import (
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gairTanm/sqlverse/db"
	"github.com/gairTanm/sqlverse/gql"
	"github.com/go-chi/chi/v5"
	"github.com/rs/cors"
)

func main() {
	d, err := db.Open("dbname=sqlverse_db sslmode=disable")
	if err != nil {
		panic(err)
	}
	defer d.Close()

	repo := db.NewRepository(d)

	router := chi.NewRouter()

	router.Use(cors.AllowAll().Handler)
	router.Use(gql.Middleware(repo))
	srv := handler.NewDefaultServer(gql.NewExecutableSchema(gql.Config{Resolvers: &gql.Resolver{Repository: repo}}))

	router.Handle("/", playground.Handler("Graphql", "/graphql"))
	router.Handle("/graphql", srv)

	port := ":8080"
	go func() {
		<-time.After(100 * time.Millisecond)
		_ = exec.Command("open", "http://localhost:8080").Run()
	}()
	_, _ = fmt.Fprintf(os.Stdout, "Server ready at http://localhost%s\n", port)
	_, _ = fmt.Fprintln(os.Stderr, http.ListenAndServe(port, router))
}
