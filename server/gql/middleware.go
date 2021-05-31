package gql

import (
	"context"
	"net/http"

	"github.com/gairTanm/sqlverse/db"
)

var userCtxKey = &contextKey{"user"}

type contextKey struct {
	name string
}

func getUser(ctx context.Context, rep db.Repository, username string) (*db.User, error){
	user, err := rep.GetUser(ctx,username)
	if err!=nil{
		return nil, err
	}
	return &user, err
}

func Middleware(rep db.Repository) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")
			if header == "" {
				next.ServeHTTP(w, r)
				return
			}

			tokenStr := header
			username, err := ParseToken(tokenStr)

			if err != nil {
				http.Error(w, "Invalid token", http.StatusForbidden)
				return
			}

			user, err := getUser(r.Context(), rep, username)
			if err != nil {
				next.ServeHTTP(w, r)
				return
			}
			ctx := context.WithValue(r.Context(), userCtxKey, user)

			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

func ForContext(ctx context.Context) *db.User {
	raw, _:= ctx.Value(userCtxKey).(*db.User)
	return raw
}