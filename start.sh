trap "kill 0" EXIT

cd client
npm start &
cd ../server
go run ./cmd/server-ex/main.go &

wait
