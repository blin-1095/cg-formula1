build:
	rm -r ./bin
	mkdir ./bin

	go clean --cache

	# windows
	env GOOS=windows GOARCH=amd64 go build -o ./bin/windows-amd64.exe ./webserver/main.go
	env GOOS=windows GOARCH=386 go build -o ./bin/windows-386.exe ./webserver/main.go

	# linux
	env GOOS=linux GOARCH=amd64 go build -o ./bin/linux-amd64 ./webserver/main.go
	env GOOS=linux GOARCH=386 go build -o ./bin/linux-386 ./webserver/main.go
	env GOOS=linux GOARCH=arm go build -o ./bin/linux-arm ./webserver/main.go
	env GOOS=linux GOARCH=arm64 go build -o ./bin/linux-arm64 ./webserver/main.go

	# macos
	env GOOS=darwin GOARCH=amd64 go build -o ./bin/darwin-amd64 ./webserver/main.go
	env GOOS=darwin GOARCH=arm64 go build -o ./bin/darwin-arm64 ./webserver/main.go

	yarn build