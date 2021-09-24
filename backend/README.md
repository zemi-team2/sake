# Sake Backend

## 🏃 セットアップと Python コードの実行

## make コマンドを使う場合

### 1. リポジトリのクローンとディレクトリの移動
```shell
git clone git@github.com:zemi-team2/sake.git
```
#### 2. 開発環境の起動
```shell
make up-backend
```

#### 3. Python コードの実行
```shell
make sh-backend
python backend/src/sample.py
```

#### 4. 開発サーバーの起動
````shell
make run-flask-app
````
[http://localhost:8000](http://localhost:8000)でアクセス可能

## make コマンドを使わない場合

### 1. リポジトリのクローンとディレクトリの移動
```shell
git clone git@github.com:zemi-team2/sake.git
```

#### 2. 開発環境の起動
```shell
docker-compose up -d --no-deps --build backend
```

#### 3. Python コードの実行
```shell
docker compose exec backend bash
python backend/src/sample.py
```

#### 4. 開発サーバーの起動
````shell
docker-compose exec backend python backend/src/app.py
````
[http://localhost:8000](http://localhost:8000)でアクセス可能
