<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $photosFile = '../uploads/photos.json';
    $photos = [];
    
    // Загружаем существующие фото
    if (file_exists($photosFile)) {
        $photos = json_decode(file_get_contents($photosFile), true);
    }
    
    // Добавляем новое фото
    $photos[] = [
        'id' => uniqid(),
        'title' => $data['title'],
        'description' => $data['description'],
        'category' => $data['category'],
        'filename' => $data['filename'],
        'uploaded_at' => date('Y-m-d H:i:s')
    ];
    
    // Сохраняем
    file_put_contents($photosFile, json_encode($photos, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true]);
}
?>
