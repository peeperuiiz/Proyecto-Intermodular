<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();

if(isset($_REQUEST['action'])){
    $action = $_REQUEST['action'];
    $action();
}

function getTypeUser(){
    echo json_encode(['type' => $_SESSION['type'] ?? 'G']);
}

?>