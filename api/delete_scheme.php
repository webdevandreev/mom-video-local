<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['id'])) {
    echo json_encode(['success' => false, 'error' => 'Нет ID']);
    exit;
}

$schemesFile = '../schemes.json';

if (!file_exists($schemesFile)) {
    echo json_encode(['success' => false, 'error' => 'Файл данных не найден']);
    exit;
}

$schemesData = json_decode(file_get_contents($schemesFile), true);
$found = false;

// Ищем и удаляем схему
foreach ($schemesData as $key => $scheme) {
    if ($scheme['id'] === $data['id']) {
        // Удаляем файл схемы с сервера (если есть)
        if (isset($scheme['file']) && $scheme['file'] !== '#') {
            $filePath = '..' . $scheme['file'];
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }
        
        // Удаляем превью с сервера (если есть и это не placeholder)
        if (isset($scheme['preview']) && 
            strpos($scheme['preview'], '/instructions/previews/') !== false) {
            $previewPath = '..' . $scheme['preview'];
            if (file_exists($previewPath)) {
                unlink($previewPath);
            }
        }
        
        // Удаляем из массива
        unset($schemesData[$key]);
        $found = true;
        break;
    }
}

if ($found) {
    // Сохраняем обновленные данные
    file_put_contents($schemesFile, json_encode(array_values($schemesData), JSON_PRETTY_PRINT));
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Схема не найдена']);
}
?>