<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Включаем отображение ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Увеличиваем лимиты
ini_set('upload_max_filesize', '500M');
ini_set('post_max_size', '500M');
ini_set('max_execution_time', '600');
ini_set('max_input_time', '600');

function jsonResponse($success, $data = []) {
    echo json_encode(array_merge(['success' => $success], $data));
    exit;
}

function formatFileSize($bytes) {
    if ($bytes >= 1073741824) {
        return number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        return number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        return number_format($bytes / 1024, 2) . ' KB';
    }
    return $bytes . ' bytes';
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, ['error' => 'Только POST метод']);
    }

    // Логируем начало
    error_log("=== НАЧАЛО ЗАГРУЗКИ СХЕМЫ ===");
    error_log("CONTENT_LENGTH: " . ($_SERVER['CONTENT_LENGTH'] ?? 'unknown'));

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

    // Получаем данные формы
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $category = $_POST['category'] ?? '';

    error_log("Файл: " . $schemeFile['name'] . ", размер: " . $schemeFile['size'] . 
              ", title: $title, category: $category");

    // Проверяем и создаем директории
    $schemesDir = __DIR__ . '/../instructions/';
    $previewsDir = __DIR__ . '/../instructions/previews/';
    
    if (!file_exists($schemesDir)) {
        mkdir($schemesDir, 0777, true);
        error_log("Создана директория схем: $schemesDir");
    }
    
    if (!file_exists($previewsDir)) {
        mkdir($previewsDir, 0777, true);
        error_log("Создана директория превью: $previewsDir");
    }

    // Генерируем уникальное имя для файла схемы
    $fileExtension = strtolower(pathinfo($schemeFile['name'], PATHINFO_EXTENSION));
    $schemeFileName = uniqid() . '_' . time() . '.' . $fileExtension;
    $schemeFilePath = $schemesDir . $schemeFileName;
    
    // Перемещаем файл схемы
    if (!move_uploaded_file($schemeFile['tmp_name'], $schemeFilePath)) {
        $error = error_get_last();
        error_log("Ошибка перемещения файла: " . print_r($error, true));
        jsonResponse(false, ['error' => 'Не удалось переместить файл схемы']);
    }

    error_log("Файл схемы сохранен: $schemeFileName");

    // Обработка превью
    $previewUrl = 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=' . urlencode($title);
    
    if (isset($_FILES['previewFile']) && $_FILES['previewFile']['error'] === UPLOAD_ERR_OK) {
        $previewFile = $_FILES['previewFile'];
        $previewExtension = strtolower(pathinfo($previewFile['name'], PATHINFO_EXTENSION));
        $previewFileName = uniqid() . '_preview_' . time() . '.' . $previewExtension;
        $previewFilePath = $previewsDir . $previewFileName;
        
        if (move_uploaded_file($previewFile['tmp_name'], $previewFilePath)) {
            $previewUrl = '/instructions/previews/' . $previewFileName;
            error_log("Превью сохранено: $previewFileName");
        } else {
            error_log("Ошибка сохранения превью");
        }
    } else {
        error_log("Превью не загружено или ошибка");
    }

    // Определяем тип файла
    $fileType = $fileExtension;
    $fileSize = formatFileSize($schemeFile['size']);

    // Возвращаем успешный ответ
    jsonResponse(true, [
        'schemeUrl' => '/instructions/' . $schemeFileName,
        'previewUrl' => $previewUrl,
        'fileType' => $fileType,
        'fileSize' => $fileSize,
        'title' => $title,
        'description' => $description,
        'category' => $category
    ]);

} catch (Exception $e) {
    error_log("Исключение: " . $e->getMessage());
    jsonResponse(false, ['error' => 'Ошибка сервера: ' . $e->getMessage()]);
}
?>
[file content end]
