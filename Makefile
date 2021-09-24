# コンテナの起動
up-frontend:
	docker-compose up -d --no-deps --build frontend

up-backend:
	docker-compose up -d --no-deps --build backend

up:
	docker-compose up -d --build

# コンテナの停止
down-frontend:
	docker-compose down frontend

down-backend:
	docker-compose down backend

down:
	docker-compose down

# ターミナルの起動
sh-frontend:
	docker-compose exec frontend bash

sh-backend:
	docker-compose exec backend bash


