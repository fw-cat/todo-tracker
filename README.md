# Laravel-Composer-Template

## Startup
1. Docker Composeの起動
~~~sh
$ docker compose up -d
~~~

2. composerのインストール
~~~sh
$ docker compose exec web /usr/bin/composer install
~~~

3. laravelのセットアップ
~~~sh
$ docker compose exec web cp -rip .env.example .env
$ docker compose exec web php artisan key:generate
~~~
