# Sake Frontend

## ðâESLint ã¨ Prettier ã®ä½¿ãæ¹

### make ã³ãã³ããä½¿ãå ´å

#### 1. éçºç°å¢ã®ç«ã¡ä¸ã

```shell
make up-frontend
```

#### 2. ã³ã¼ãã¹ã¿ã¤ã«ã®ãã§ãã¯

```shell
# ã³ã¼ãã Airbnb JavaScript Style Guide ã«å¾ã£ã¦ããããã§ãã¯
make lint-frontend

# ã³ã¼ããèªåçã«ä¿®æ­£
make format-frontend
```

### make ã³ãã³ããä½¿ããªãå ´å

#### 1. éçºç°å¢ã®ç«ã¡ä¸ã

```shell
docker-compose up -d --no-deps --build frontend
```

#### 2. ã³ã¼ãã¹ã¿ã¤ã«ã®ãã§ãã¯

```shell
# ã³ã¼ãã Airbnb JavaScript Style Guide ã«å¾ã£ã¦ããããã§ãã¯
docker-compose exec frontend npm run lint

# ã³ã¼ããèªåçã«ä¿®æ­£
docker-compose exec frontend npm run format
```
