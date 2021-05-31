package db

import (
	"context"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type Repository interface{
	AuthenticateUser(ctx context.Context, arg AuthenticateUserParams) (User, error)
	CreateUser(ctx context.Context, arg CreateUserParams) (User, error)
	DeleteUser(ctx context.Context, arg DeleteUserParams) (User, error)
	GetUser(ctx context.Context, username string) (User, error)
	GetUsers(ctx context.Context) ([]User, error)
	UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error)

	DeleteDetails(ctx context.Context, username sql.NullString) (UserDetail, error)
}

type repoSvc struct {
	*Queries
	db *sql.DB
}

func (r *repoSvc) withTx(ctx context.Context, txFn func(*Queries) error) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	q := New(tx)
	err = txFn(q)
	if err != nil {
		if rbErr := tx.Rollback(); rbErr != nil {
			err = fmt.Errorf("tx failed: %v, unable to rollback: %v", err, rbErr)
		}
	} else {
		err = tx.Commit()
	}
	return err
}

func NewRepository(db *sql.DB) Repository {
	return &repoSvc{
		Queries: New(db),
		db:      db,
	}
}

func Open(dataSourceName string) (*sql.DB, error) {
	return sql.Open("postgres", dataSourceName)
}