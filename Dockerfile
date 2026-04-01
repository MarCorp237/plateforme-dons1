FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip nodejs npm nginx supervisor

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs || true
RUN npm install --legacy-peer-deps || true
RUN npm run build || true

RUN mkdir -p storage/framework/views storage/framework/sessions storage/framework/cache storage/logs
RUN chmod -R 775 storage

RUN cp .env.example .env || true
RUN php artisan key:generate --force || true

COPY nginx.conf /etc/nginx/sites-available/default

RUN echo '[supervisord]\nnodaemon=true\n\n[program:php-fpm]\ncommand=php-fpm\nstdout_logfile=/dev/stdout\nstderr_logfile=/dev/stderr\n\n[program:nginx]\ncommand=nginx -g "daemon off;"\nstdout_logfile=/dev/stdout\nstderr_logfile=/dev/stderr' > /etc/supervisor/conf.d/laravel.conf

EXPOSE 80
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/laravel.conf"]
