# sake

## 🏃 セットアップと Python コードの実行

## make コマンドを使う場合

### 1. リポジトリのクローン
```shell
git clone git@github.com:zemi-team2/sake.git
```

#### 2. 開発環境の初期化
```shell
make init
```

#### 3. 開発環境の起動
```shell
make up
```

#### 4. Python コードの実行
```shell
make sh
python sample.py
```

## make コマンドを使わない場合

### 1. リポジトリのクローン
```shell
git clone git@github.com:zemi-team2/sake.git
```

#### 2. 開発環境の初期化
```shell
docker compose build
```

#### 3. 開発環境の起動
```shell
docker compose up
```

#### 4. Python コードの実行
```shell
docker compose exec python3 bash
python sample.py
```
