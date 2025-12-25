<?php
// Включаем вывод всех ошибок
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$uploadDir = '../uploads/users/';

// Создаем папку если нет
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        echo json_encode(['success' => false, 'error' => 'Cannot create directory']);
        exit;
    }
}

// Проверяем права папки
if (!is_writable($uploadDir)) {
    echo json_encode(['success' => false, 'error' => 'Directory not writable: ' . $uploadDir]);
    exit;
}

if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $fileName = uniqid() . '_' . $_FILES['photo']['name'];
    $filePath = $uploadDir . $fileName;
    
    if (move_uploaded_file($_FILES['photo']['tmp_name'], $filePath)) {
        echo json_encode(['success' => true, 'filename' => $fileName]);
    } else {
        $error = error_get_last();
        echo json_encode(['success' => false, 'error' => 'Move failed: ' . $error['message']]);
    }
} else {
    $error = $_FILES['photo']['error'] ?? 'No file';
    echo json_encode(['success' => false, 'error' => 'Upload error: ' . $error]);
}
?>
