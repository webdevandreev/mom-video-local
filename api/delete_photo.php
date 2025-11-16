<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $photoId = $data['id'] ?? '';
    
    if (empty($photoId)) {
        echo json_encode(['success' => false, 'error' => 'ID фото не указан']);
        exit;
    }
    
    $photosFile = '../uploads/photos.json';
    
    if (!file_exists($photosFile)) {
        echo json_encode(['success' => false, 'error' => 'Файл с фото не найден']);
        exit;
    }
    
    $photos = json_decode(file_get_contents($photosFile), true);
    $photoIndex = -1;
    $photoToDelete = null;
    
    // Находим фото по ID
    foreach ($photos as $index => $photo) {
        if ($photo['id'] === $photoId) {
            $photoIndex = $index;
            $photoToDelete = $photo;
            break;
        }
    }
    
    if ($photoIndex === -1 || !$photoToDelete) {
        echo json_encode(['success' => false, 'error' => 'Фото не найдено']);
        exit;
    }
    
    // Удаляем файл с сервера
    $filePath = '../uploads/users/' . $photoToDelete['filename'];
    if (file_exists($filePath)) {
        if (!unlink($filePath)) {
            echo json_encode(['success' => false, 'error' => 'Ошибка удаления файла']);
            exit;
        }
    }
    
    // Удаляем метаданные из JSON
    array_splice($photos, $photoIndex, 1);
    
    // Сохраняем обновленный JSON
    if (file_put_contents($photosFile, json_encode($photos, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true, 'message' => 'Фото успешно удалено']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Ошибка сохранения данных']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Только POST запросы']);
}
?>