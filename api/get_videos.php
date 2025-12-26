<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$videosFile = '../../videos/videos.json';

if (file_exists($videosFile)) {
    $videos = json_decode(file_get_contents($videosFile), true);
    if (!is_array($videos)) {
        $videos = [];
    }
    
    // Добавляем полный URL для файлов
    foreach ($videos as &$video) {
        if (isset($video['filepath']) && strpos($video['filepath'], 'http') !== 0) {
            $video['fileUrl'] = $video['filepath'];
        }
    }
    
    echo json_encode($videos);
} else {
    echo json_encode([]);
}
?>