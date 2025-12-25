<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = '../uploads/users/';
    
    // Создаем папку если нет
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $fileName = uniqid() . '_' . $_FILES['photo']['name'];
        $filePath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['photo']['tmp_name'], $filePath)) {
            echo json_encode([
                'success' => true, 
                'message' => 'Фото успешно загружено',
                'filename' => $fileName
            ]);
        } else {
            echo json_encode([
                'success' => false, 
                'error' => 'Ошибка при сохранении файла'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false, 
            'error' => 'Файл не загружен или ошибка загрузки'
        ]);
    }
} else {
    echo json_encode([
        'success' => false, 
        'error' => 'Только POST запросы'
    ]);
}
?>
