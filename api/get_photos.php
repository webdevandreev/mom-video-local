<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$photosFile = '../uploads/photos.json';
if (file_exists($photosFile)) {
    $photos = json_decode(file_get_contents($photosFile), true);
    echo json_encode($photos ?: []);
} else {
    echo json_encode([]);
}
?>
