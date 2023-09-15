myblog api

## how to use

1. Open database:

```
$ docker compose up
```

2. Build and install dependency:

```
$ bundle config set --local path vendor/bundle 将 gem 安装在项目目录下
$ bin/setup # 下载 gem, create, migrate, seed 数据库
```

3. Start dev server:

```
$ bin/rails server -b 0.0.0.0
```