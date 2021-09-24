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


# 起動中のコンテナの確認
view-run-container:
	docker ps

# linterの実行
lint-frontend:
	docker-compose exec frontend npm run lint

lint-backend:
	docker-compose exec backend npm run flake8 backend/src

# formaterの実行
format-frontend:
	docker-compose exec frontend npm run format

format-backend:
	docker-compose exec backend black backend/src/

# flaskの開発用ローカルホストサーバを起動
run-flask-app:
	docker-compose exec backend python backend/src/app.py

# visionAIのプログラムを実行
run-visionAI:
	docker-compose exec backend python backend/src/OCR.py
