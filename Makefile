.PHONY init:
init:
	docker compose build

.PHONY up:
up:
	docker compose up

.PHONY upd:
upd:
	docker compose up -d

.PHONY sh:
sh:
	docker compose exec python3 bash

.PHONY down:
down:
	docker compose down
