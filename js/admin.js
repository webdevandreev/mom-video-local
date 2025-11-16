// admin.js
document.addEventListener('DOMContentLoaded', function() {
    let currentDeletePhotoId = null;

    // Загрузка фото при старте
    loadAdminPhotos();

    // Обработчики событий
    document.getElementById('refreshBtn').addEventListener('click', loadAdminPhotos);
    document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);
    document.getElementById('confirmDelete').addEventListener('click', confirmDelete);

    // Функция загрузки фото для админки
    async function loadAdminPhotos() {
        try {
            showNotification('⏳ Загружаем фото...', 'info', 2000);
            const response = await fetch('/api/get_photos.php');
            const photos = await response.json();
            
            displayAdminPhotos(photos);
            updateStats(photos);
        } catch (error) {
            console.error('Ошибка загрузки фото:', error);
            showNotification('❌ Ошибка загрузки фото', 'error');
        }
    }

    // Функция отображения фото в админке
    function displayAdminPhotos(photos) {
        const container = document.getElementById('adminPhotosContainer');
        const noPhotos = document.getElementById('noAdminPhotos');

        container.innerHTML = '';

        if (photos.length === 0) {
            noPhotos.style.display = 'block';
            container.style.display = 'none';
            return;
        }

        noPhotos.style.display = 'none';
        container.style.display = 'grid';

        photos.forEach(photo => {
            const photoCard = createAdminPhotoCard(photo);
            container.appendChild(photoCard);
        });
    }

    // Функция создания карточки фото для админки
    function createAdminPhotoCard(photo) {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.setAttribute('data-id', photo.id);

        photoCard.innerHTML = `
            <img src="/uploads/users/${photo.filename}" alt="${photo.title}" class="photo-image" style="cursor: default;">
            <div class="photo-info">
                <div class="photo-title">${photo.title}</div>
                <div class="photo-description">${photo.description}</div>
                <div class="photo-category">${getCategoryName(photo.category)}</div>
                <div class="photo-meta" style="font-size: 0.8em; color: #666; margin-top: 8px;">
                    <strong>ID:</strong> ${photo.id}<br>
                    <strong>Файл:</strong> ${photo.filename}<br>
                    <strong>Загружено:</strong> ${formatDate(photo.uploaded_at)}
                </div>
                <button class="delete-photo-btn" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px; width: 100%; font-size: 0.9em;">
                    <i class="fas fa-trash"></i> Удалить фото
                </button>
            </div>
        `;

        // Обработчик удаления
        const deleteBtn = photoCard.querySelector('.delete-photo-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openDeleteModal(photo);
        });

        return photoCard;
    }

    // Функция обновления статистики
    function updateStats(photos) {
        const statsContainer = document.getElementById('statsContainer');
        
        const categories = {
            beading: 'Бисероплетение',
            sculpting: 'Лепка', 
            knitting: 'Вязание'
        };

        const stats = {
            total: photos.length,
            byCategory: {}
        };

        // Считаем по категориям
        photos.forEach(photo => {
            if (!stats.byCategory[photo.category]) {
                stats.byCategory[photo.category] = 0;
            }
            stats.byCategory[photo.category]++;
        });

        statsContainer.innerHTML = `
            <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 2em; font-weight: bold; color: #4a90e2;">${stats.total}</div>
                <div style="color: #666;">Всего фото</div>
            </div>
            ${Object.entries(stats.byCategory).map(([category, count]) => `
                <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 1.5em; font-weight: bold; color: #27ae60;">${count}</div>
                    <div style="color: #666;">${categories[category] || category}</div>
                </div>
            `).join('')}
            ${Object.keys(categories).filter(cat => !stats.byCategory[cat]).map(cat => `
                <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px; opacity: 0.5;">
                    <div style="font-size: 1.5em; font-weight: bold; color: #95a5a6;">0</div>
                    <div style="color: #666;">${categories[cat]}</div>
                </div>
            `).join('')}
        `;
    }

    // Функции модального окна удаления
    function openDeleteModal(photo) {
        currentDeletePhotoId = photo.id;
        const modal = document.getElementById('deleteConfirmModal');
        const text = document.getElementById('deleteConfirmText');
        
        text.textContent = `Вы уверены, что хотите удалить фото "${photo.title}"? Это действие нельзя отменить.`;
        modal.style.display = 'block';
    }

    function closeDeleteModal() {
        const modal = document.getElementById('deleteConfirmModal');
        modal.style.display = 'none';
        currentDeletePhotoId = null;
    }

    // Функция подтверждения удаления
    async function confirmDelete() {
        if (!currentDeletePhotoId) return;

        const confirmBtn = document.getElementById('confirmDelete');
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Удаляем...';
        confirmBtn.disabled = true;

        try {
            const response = await fetch('/api/delete_photo.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: currentDeletePhotoId })
            });

            const result = await response.json();

            if (result.success) {
                showNotification('✅ Фото успешно удалено', 'success');
                closeDeleteModal();
                await loadAdminPhotos(); // Перезагружаем список
            } else {
                showNotification('❌ Ошибка удаления: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Ошибка удаления:', error);
            showNotification('❌ Сетевая ошибка при удалении', 'error');
        } finally {
            confirmBtn.innerHTML = '<i class="fas fa-trash"></i> Удалить';
            confirmBtn.disabled = false;
        }
    }

    // Вспомогательные функции
    function getCategoryName(category) {
        const categories = {
            beading: 'Бисероплетение',
            sculpting: 'Лепка',
            knitting: 'Вязание'
        };
        return categories[category] || category;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU');
    }

    function showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
        
        return notification;
    }

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('deleteConfirmModal');
        if (event.target === modal) {
            closeDeleteModal();
        }
    });
});