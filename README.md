Myblog

## how to use

1. Open database:

```
$ docker compose up
```

2. Build and install dependency:

```
$ bundle config set --local path vendor/bundle 将 gem 安装在项目目录下，推荐不用
$ bin/setup # 下载 gem, create, migrate, seed 数据库
```

3. Start dev server:

```
$ bin/dev
```