# sake

実践ゼミで開発する”酒 × AI"をテーマにしたアプリケーションです。

# 環境構築
## 開発環境
開発・実行にはdockerを使用します。
### 構築
- `make up `  
makeが実行出来ない場合
- `docker-compose up -d --build`
### ターミナルにアクセス
- `make sh-{backend | frontend}`
makeが実行出来ない場合
- `docker-compose exec {backend | frontend} bash`
### 開発サーバーの起動  
- `make run-flask-app`  

### その他
- 他にも頻出するコマンドを`Makefile`にまとめているので必要があれば参考にしてください
