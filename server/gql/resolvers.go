package gql

import (
	"context"
	"fmt"
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

func (r *userResolver)Friends(ctx context.Context, user *db.User)([]db.User, error){
	panic("??")
}

func (r *mutationResolver) CreateUser(ctx context.Context, data UserInput) (*db.User, error) {
	hashedPassword, err := hashAndSalt(data.Password)
	if err !=nil{
		return nil, err
	}
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
	user := ForContext(ctx)
	if user==nil{
		return &db.User{}, fmt.Errorf("access denied")
	}
	hashedPassword, err := hashAndSalt(data.Password)
	if err !=nil{
		return nil, err
	}

	updatedUser, err := r.Repository.UpdateUser(ctx, db.UpdateUserParams{
		Username: data.Username,
		Name:     data.Name,
		Password: hashedPassword,
	})
	if err!=nil{
		return nil, err
	}
	return &updatedUser, nil
}

func (r *mutationResolver) DeleteUser(ctx context.Context, username string) (*db.User, error) {
	user := ForContext(ctx)
	log.Println(username)
	if user!=nil{
		return &db.User{}, fmt.Errorf("access denied")
	}
	log.Println(user)
	return user, nil
}


func (r *queryResolver) GetUser(ctx context.Context, username string) (*db.User, error) {
	user, err := r.Repository.GetUser(ctx, username)
	if err!=nil{
		return nil, err
	}
	return &user, nil
}

func (r *queryResolver) GetUsers(ctx context.Context) ([]db.User, error) {
	user := ForContext(ctx)
	if user==nil{
		return []db.User{}, fmt.Errorf("access denied")
	}
	return r.Repository.GetUsers(ctx)
}

func (r *queryResolver) Me(ctx context.Context)(*db.User, error){
	panic("??")
}

func (r *mutationResolver) Login(ctx context.Context, username string, password string) (*Token, error){
	user, err := r.Repository.GetUser(ctx, username)
	if err!=nil{
		return nil, err
	}
	if !comparePasswords(user.Password, password){
		return nil, fmt.Errorf("wrong password")
	}
	token, err := GenerateToken(username)
	if err!=nil{
		return nil, err
	}
	t := Token{Value: token}
	return &t, nil
}

func (r *mutationResolver) RefreshToken(ctx context.Context, input RefreshTokenInput)(*Token, error){
	username, err := ParseToken(input.Token)
	if err != nil {
		return &Token{}, fmt.Errorf("access denied")
	}
	token, err := GenerateToken(username)
	if err != nil {
		return &Token{}, err
	}
	return &Token{Value: token}, nil
}

func (r *mutationResolver) AddAsFriend(ctx context.Context, username string) (*db.User, error){
	panic("??")
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

func (r *Resolver) User() UserResolver {return &userResolver{r}}

type userResolver struct {*Resolver}
type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
