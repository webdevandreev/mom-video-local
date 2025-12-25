<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$schemesFile = '../schemes.json';

// Если файла нет, создаем пустой массив
if (!file_exists($schemesFile)) {
    file_put_contents($schemesFile, json_encode([]));
    echo json_encode([]);
    exit;
}

// Читаем существующие схемы
$schemesData = json_decode(file_get_contents($schemesFile), true) ?: [];

echo json_encode($schemesData);
?>