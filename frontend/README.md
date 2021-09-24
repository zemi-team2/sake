# Sake Frontend

## 🏃‍ESLint と Prettier の使い方

### make コマンドを使う場合

#### 1. 開発環境の立ち上げ

```shell
make up-frontend
```

#### 2. コードスタイルのチェック

```shell
# コードが Airbnb JavaScript Style Guide に従っているかチェック
make lint-frontend

# コードを自動的に修正
make format-frontend
```

### make コマンドを使わない場合

#### 1. 開発環境の立ち上げ

```shell
docker-compose up -d --no-deps --build frontend
```

#### 2. コードスタイルのチェック

```shell
# コードが Airbnb JavaScript Style Guide に従っているかチェック
docker-compose exec frontend npm run lint

# コードを自動的に修正
docker-compose exec frontend npm run format
```
