FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip nodejs npm

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs || true

# Installer les dépendances NPM
RUN npm install --legacy-peer-deps || true

# Compiler les assets
RUN npm run build || true

# Créer les dossiers nécessaires
RUN mkdir -p storage/framework/views storage/framework/sessions storage/framework/cache storage/logs
RUN chmod -R 775 storage

# Créer le fichier .env
RUN cp .env.example .env || true

# Générer la clé
RUN php artisan key:generate --force || true

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
