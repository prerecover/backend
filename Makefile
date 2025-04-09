run-prod:
	docker compose -f ./docker-compose.prod.yaml up --build
run-dev:
	docker compose -f ./docker-compose.dev.yaml up --build
build: 
	docker buildx build --platform linux/amd64,linux/arm64 -t ternyavsky/backend --push .

