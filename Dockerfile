FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip nodejs npm

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Installer les dépendances
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs || true
RUN npm install --legacy-peer-deps || true
RUN npm run build || true

# Créer les dossiers
RUN mkdir -p storage/framework/views storage/framework/sessions storage/framework/cache storage/logs
RUN chmod -R 775 storage

# Créer .env
RUN cp .env.example .env || true
RUN php artisan key:generate --force || true

# Script de démarrage qui attend la base de données
RUN echo '#!/bin/bash\n\
echo "Waiting for database to be ready..."\n\
while ! php artisan migrate:status --force 2>/dev/null; do\n\
    echo "Database not ready yet. Waiting 5 seconds..."\n\
    sleep 5\n\
done\n\
echo "Database is ready. Running migrations..."\n\
php artisan migrate --force\n\
php artisan db:seed --force\n\
php artisan storage:link\n\
echo "Starting server..."\n\
php artisan serve --host=0.0.0.0 --port=8000\n\
' > /start.sh && chmod +x /start.sh

EXPOSE 8000
CMD ["/start.sh"]
