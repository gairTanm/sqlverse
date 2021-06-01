trap "kill 0" EXIT

cd client || exit
npm start &
cd ../server || exit
go run ./cmd/server-ex/main.go &

wait
