# Sake Frontend

## 🏃‍ESLint と Prettier の使い方

### make コマンドを使う場合

#### 1. 開発環境の初期化

```shell
make init
```

#### 2. 開発環境の立ち上げ

```shell
make up
```

#### 3. コードスタイルのチェック

```shell
# コードが Airbnb JavaScript Style Guide に従っているかチェック
npm run lint

# コードを自動的に修正
npm run format
```

### make コマンドを使わない場合

#### 1. 開発環境の初期化

```shell
docker compose build
```

#### 2. 開発環境の立ち上げ

```shell
docker compose up
```

#### 3. コードスタイルのチェック

```shell
# コードが Airbnb JavaScript Style Guide に従っているかチェック
npm run lint

# コードを自動的に修正
npm run format
```
