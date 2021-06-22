package dataloaders

import (
	"context"

	"github.com/gairTanm/sqlverse/db"
)

type contextKey string

const key = contextKey("dataloaders")

type Loaders struct {
}

func newLoaders(ctx context.Context, repo db.Repository) *Loaders {
	return &Loaders{}
}
