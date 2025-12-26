<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'error' => 'Нет данных']);
        exit;
    }
    
    // Генерируем уникальный ID
    $videoId = uniqid('video_');
    $videoData = [
        'id' => $videoId,
        'title' => $data['title'] ?? 'Без названия',
        'description' => $data['description'] ?? '',
        'category' => $data['category'] ?? 'beading',
        'filename' => $data['filename'],
        'filepath' => $data['filepath'] ?? '/videos/original/' . $data['filename'],
        'filesize' => $data['filesize'] ?? '0 MB',
        'duration' => $data['duration'] ?? '00:00',
        'thumbnail' => $data['thumbnail'] ?? '',
        'uploadDate' => date('Y-m-d'),
        'views' => 0,
        'source' => 'local', // Новое поле!
        'materials' => $data['materials'] ?? [],
        'tags' => $data['tags'] ?? []
    ];
    
    // Загружаем существующие видео
    $videosFile = '../../videos/videos.json';
    $videos = [];
    
    if (file_exists($videosFile)) {
        $videos = json_decode(file_get_contents($videosFile), true);
        if (!is_array($videos)) {
            $videos = [];
        }
    }
    
    // Добавляем новое видео
    $videos[] = $videoData;
    
    // Сохраняем обратно
    if (file_put_contents($videosFile, json_encode($videos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo json_encode([
            'success' => true,
            'message' => 'Данные видео сохранены',
            'videoId' => $videoId
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Ошибка сохранения данных'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Только POST запросы'
    ]);
}
?>