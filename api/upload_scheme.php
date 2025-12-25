<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Включаем отображение ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Увеличиваем лимиты
ini_set('upload_max_filesize', '20M');
ini_set('post_max_size', '20M');
ini_set('max_execution_time', '300');

function jsonResponse($success, $data = []) {
    echo json_encode(array_merge(['success' => $success], $data));
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, ['error' => 'Только POST метод']);
    }

    // Проверяем загрузку файлов
    if (!isset($_FILES['schemeFile'])) {
        jsonResponse(false, ['error' => 'Нет файла схемы']);
    }

    $schemeFile = $_FILES['schemeFile'];
    
    // Проверка ошибок загрузки
    if ($schemeFile['error'] !== UPLOAD_ERR_OK) {
        $errorMessages = [
            UPLOAD_ERR_INI_SIZE => 'Файл превышает upload_max_filesize',
            UPLOAD_ERR_FORM_SIZE => 'Файл превышает MAX_FILE_SIZE',
            UPLOAD_ERR_PARTIAL => 'Файл загружен частично',
            UPLOAD_ERR_NO_FILE => 'Файл не был загружен',
            UPLOAD_ERR_NO_TMP_DIR => 'Отсутствует временная папка',
            UPLOAD_ERR_CANT_WRITE => 'Не удалось записать файл на диск',
            UPLOAD_ERR_EXTENSION => 'PHP расширение остановило загрузку'
        ];
        
        $errorMsg = $errorMessages[$schemeFile['error']] ?? 'Неизвестная ошибка';
        jsonResponse(false, ['error' => "Ошибка загрузки: $errorMsg"]);
    }

    // ... остальной код обработки файла ...

} catch (Exception $e) {
    jsonResponse(false, ['error' => 'Ошибка сервера: ' . $e->getMessage()]);
}
?>