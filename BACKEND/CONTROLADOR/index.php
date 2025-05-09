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
    if(isset($_SESSION['nom_usu'])){
        $user = new User();

        $info = $user->getUser($_SESSION['nom_usu']);
        $_SESSION['type'] = $info[0][6];
    }
    echo json_encode(['type' => $_SESSION['type'] ?? 'G']);
}

function signInNewUser(){
    $user = new User();

    $validate = $user->signInNewUser($_POST['id'], $_POST['name'], $_POST['surname'], $_POST['email'], $_POST['nom_usu'], $_POST['pss']);

    if(!$validate){
        echo json_encode(['err' => 'That user name is already used.']);
    }else{
        $_SESSION['nom_usu'] = $_POST['nom_usu'];

        if($_POST['check'] === 1){
            setcookie('email', $_POST['email'], time() + (30*24*3600));

            echo json_encode(['cookies' => true]);
        }
    }
}

function logInUser(){
    $user = new User();

    $validate = $user->validateLogIn($_POST['email'], $_POST['pss']);

    if(!$validate){
        echo json_encode(['err' => 'Email, password or both are incorrect']);
    }else{
        $nom_u = $user->getNomUsu($_POST['email']);

        $_SESSION['nom_usu'] = $nom_u;

        if($_POST['check'] === 1){
            setcookie('email', $_POST['email'], time() + (30*24*3600));

            echo json_encode(['cookies' => true]);
        }
    }
}

?>