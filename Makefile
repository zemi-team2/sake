init:
	docker compose build

up:
	docker compose up

upd:
	docker compose up -d

sh:
	docker compose exec python3 bash

down:
	docker compose down
