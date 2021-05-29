package gql

import (
	"net/http"

	"github.com/99designs/gqlgen/handler"
	"github.com/gairTanm/sqlverse/db"
)

func NewHandler(repo db.Repository) http.Handler {
	return handler.GraphQL(NewExecutableSchema(Config{
		Resolvers: &Resolver{
			Repository: repo,
		},
	}))
}

func NewPlaygroundHandler(endpoint string) http.Handler {
	return handler.Playground("GraphQL Playground", endpoint)
}
