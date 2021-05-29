package gql

import (
	"context"
	"log"

	"github.com/gairTanm/sqlverse/db"
	"golang.org/x/crypto/bcrypt"
)

type Resolver struct{
	Repository db.Repository
}

func hashAndSalt(password string) (string, error){
	pwd := []byte(password)
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.DefaultCost)
	if err!=nil{
		return "", err
	}
	return string(hash), nil
}

func comparePasswords(hashed string, plain string) bool{
	hashedPassword := []byte(hashed)
	password := []byte(plain)
	err := bcrypt.CompareHashAndPassword(hashedPassword, password)
	if err!=nil{
		log.Println(err)
		return false
	}
	return true
}

func (r *mutationResolver) CreateUser(ctx context.Context, data UserInput) (*db.User, error) {
	hashedPassword, err := hashAndSalt(data.Password)
	if err !=nil{
		return nil, err
	}
	log.Println(data)
	user, err := r.Repository.CreateUser(ctx, db.CreateUserParams{
		Username: data.Username,
		Name:     data.Name,
		Password: hashedPassword,
	})
	if err!=nil{
		return nil, err
	}
	return &user, nil
}

func (r *mutationResolver) UpdateUser(ctx context.Context, data UserInput) (*db.User, error) {
	panic("not implemented")
}

func (r *mutationResolver) DeleteUser(ctx context.Context, username string) (*db.User, error) {
	panic("not implemented")
}

func (r *queryResolver) GetUser(ctx context.Context, username string) (*db.User, error) {
	user, err := r.Repository.GetUser(ctx, username)
	if err!=nil{
		return nil, err
	}
	return &user, nil
}

func (r *queryResolver) GetUsers(ctx context.Context) ([]db.User, error) {
	return r.Repository.GetUsers(ctx)
}

func (r *queryResolver) Me(ctx context.Context)(*db.User, error){
	panic("??")
}

func (r *mutationResolver) Login(ctx context.Context, username string, password string) (*Token, error){
	panic("??")
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
