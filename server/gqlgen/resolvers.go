package gqlgen

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

import (
	"context"

	"github.com/gairTanm/sqlverse/pg"
)

type Resolver struct {
	Repository pg.Repository
}

func (r *mutationResolver) CreateUser(ctx context.Context, data UserInput) (*pg.User, error) {
	panic("not implemented")
}

func (r *mutationResolver) UpdateUser(ctx context.Context, data UserInput) (*pg.User, error) {
	panic("not implemented")
}

func (r *mutationResolver) DeleteUser(ctx context.Context, username string) (*pg.User, error) {
	panic("not implemented")
}

func (r *queryResolver) GetUser(ctx context.Context, username string) (*pg.User, error) {
	panic("not implemented")
}

func (r *queryResolver) GetUsers(ctx context.Context) ([]pg.User, error) {
	return r.Repository.GetUsers(ctx)
}

func (r *userResolver) ID(ctx context.Context, obj *pg.User) (int64, error) {
	panic("not implemented")
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// User returns UserResolver implementation.
func (r *Resolver) User() UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
