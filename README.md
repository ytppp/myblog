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

## how to fix follow questions

1. Rails: Address already in use - bind(2) (Errno::EADDRINUSE) ?

answer:

```
$ lsof -wni tcp:3000
$ kill -9 PID
```

2. A server is already running ?

answer:

delete ./tmp/pids/server.pid
