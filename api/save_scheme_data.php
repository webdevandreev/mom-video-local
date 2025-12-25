<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Получаем данные из POST
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Нет данных']);
    exit;
}

$schemesFile = '../schemes.json';

// Читаем существующие схемы
$schemesData = file_exists($schemesFile) ? 
    json_decode(file_get_contents($schemesFile), true) : [];

// Создаем новую схему
$newScheme = [
    'id' => uniqid(),
    'title' => $data['title'],
    'description' => $data['description'],
    'category' => $data['category'],
    'file' => $data['file'],
    'preview' => $data['preview'] ?: 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=' . urlencode($data['title']),
    'fileType' => $data['fileType'],
    'fileSize' => $data['fileSize'],
    'date' => date('Y-m-d H:i:s')
];

// Добавляем новую схему
$schemesData[] = $newScheme;

// Сохраняем
if (file_put_contents($schemesFile, json_encode($schemesData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['success' => true, 'scheme' => $newScheme]);
} else {
    echo json_encode(['success' => false, 'error' => 'Ошибка сохранения данных']);
}
?>