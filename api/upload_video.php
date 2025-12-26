<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ОЧЕНЬ ПРОСТОЙ КОД ДЛЯ ТЕСТА
try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Только POST запросы');
    }
    
    if (!isset($_FILES['video'])) {
        throw new Exception('Файл video не найден в запросе');
    }
    
    $file = $_FILES['video'];
    
    // Проверяем ошибки
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Ошибка загрузки файла: ' . $file['error']);
    }
    
    // Папка для загрузки
    $uploadDir = '../../videos/original/';
    
    // Создаем папку если нет
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    // Простая проверка расширения
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
    
    if (!in_array($ext, $allowed)) {
        throw new Exception('Неподдерживаемый формат: .' . $ext);
    }
    
    // Имя файла
    $filename = 'video_' . time() . '.' . $ext;
    $destination = $uploadDir . $filename;
    
    // Пробуем переместить
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        // Успех!
        $response = [
            'success' => true,
            'message' => 'Файл загружен успешно!',
            'filename' => $filename,
            'path' => $destination,
            'size' => $file['size'],
            'debug' => [
                'temp_file' => $file['tmp_name'],
                'dest_exists' => file_exists($destination),
                'dest_size' => filesize($destination)
            ]
        ];
        echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    } else {
        throw new Exception('Ошибка move_uploaded_file');
    }
    
} catch (Exception $e) {
    $errorResponse = [
        'success' => false,
        'error' => $e->getMessage(),
        'debug' => [
            'method' => $_SERVER['REQUEST_METHOD'] ?? 'unknown',
            'has_files' => isset($_FILES) ? 'yes' : 'no',
            'files_count' => isset($_FILES) ? count($_FILES) : 0,
            'php_user' => function_exists('posix_geteuid') ? posix_geteuid() : 'unknown'
        ]
    ];
    echo json_encode($errorResponse, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>
