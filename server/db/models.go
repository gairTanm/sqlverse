// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"database/sql"
	"time"
)

type Friendship struct {
	Username    string
	FriendName  string
	CreatedDate time.Time
}

type User struct {
	Username    string
	Name        string
	Password    string
	CreatedDate time.Time
}

type UserDetail struct {
	UserID    int32
	Username  sql.NullString
	FirstName sql.NullString
	LastName  sql.NullString
	Gender    sql.NullString
	Password  sql.NullString
	Status    sql.NullInt32
}
