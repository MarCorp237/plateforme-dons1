FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip nodejs npm

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

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
