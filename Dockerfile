FROM php:8.2-fpm

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm \
    nginx \
    supervisor

# Installer les extensions PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copier les fichiers de l'application
WORKDIR /app
COPY . .

# Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Installer les dépendances NPM
RUN npm install --legacy-peer-deps

# Compiler les assets
RUN npm run build

# Configurer les permissions
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache
RUN chmod -R 775 /app/storage /app/bootstrap/cache

# Configurer Nginx
RUN echo "server { listen 80; server_name _; root /app/public; index index.php; location / { try_files \$uri \$uri/ /index.php?\$query_string; } location ~ \.php$ { fastcgi_pass 127.0.0.1:9000; fastcgi_index index.php; fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name; include fastcgi_params; } }" > /etc/nginx/sites-available/default

# Configurer Supervisor
RUN echo "[supervisord]\nnodaemon=true\nlogfile=/var/log/supervisor/supervisord.log\npidfile=/var/run/supervisord.pid\n\n[program:php-fpm]\ncommand=/usr/local/sbin/php-fpm\nautostart=true\nautorestart=true\nstdout_logfile=/var/log/php-fpm.log\nstderr_logfile=/var/log/php-fpm.error.log\n\n[program:nginx]\ncommand=/usr/sbin/nginx -g \"daemon off;\"\nautostart=true\nautorestart=true\nstdout_logfile=/var/log/nginx/access.log\nstderr_logfile=/var/log/nginx/error.log" > /etc/supervisor/conf.d/laravel.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/laravel.conf"]
