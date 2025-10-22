#!/bin/bash
echo "��� Starting deploy..."

# Сборка проекта
gulp
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Копирование на сервер
echo "��� Copying files to server..."
scp -r dist/* coffee@78.107.238.63:/var/www/mom-video/

# Удаляем старые файлы перед созданием симлинков
echo "��� Creating symlinks on server..."
ssh coffee@78.107.238.63 "cd /var/www/mom-video && rm -f style.css app.js && ln -sf style-*.css style.css && ln -sf app-*.js app.js"

echo "✅ Deploy completed successfully!"
echo "��� Site: https://videomasterclass.ru"
