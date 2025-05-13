<?php
session_set_cookie_params([
  'lifetime' => 0,
  'path' => '/',
  'domain' => 'localhost',
  'secure' => true,
  'httponly' => true,
  'samesite' => 'None'
]);

session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if(isset($_REQUEST['action'])){
    $action = $_REQUEST['action'];
    $action();
}

function getTypeUser(){
    echo json_encode(['type' => $_SESSION['type'] ?? 'G']);
}

function signInNewUser(){
    require_once('../MODELOS/class.user.php');

    $user = new User();

    $validate = $user->signInNewUser($_POST['id'], $_POST['name'], $_POST['surname'], $_POST['email'], $_POST['nom_usu'], $_POST['pss']);

    if(!$validate){
        echo json_encode(['err' => 'That user name is already used.']);
    }else{
        $_SESSION['nom_usu'] = $_POST['nom_usu'];

        $info = $user->getUser($_SESSION['nom_usu']);
        $_SESSION['type'] = $info[0][7] ?? 'G';

        echo json_encode([
            'nom' => $_SESSION['nom_usu'],
            'type' => $_SESSION['type']
        ]);

        if($_POST['check'] === 1){
            setcookie('email', $_POST['email'], time() + (30*24*3600));

            echo json_encode(['cookies' => true]);
        }
    }
}

function logInUser(){
    require_once('../MODELOS/class.user.php');

    $user = new User();

    $validate = $user->validateLogIn($_POST['email'], $_POST['pss']);

    if(!$validate){
        echo json_encode(['err' => 'Email, password or both are incorrect']);
    }else{
        $nom_u = $user->getNomUsu($_POST['email']);

        $_SESSION['nom_usu'] = $nom_u;

        $info = $user->getUser($_SESSION['nom_usu']);
        $_SESSION['type'] = $info[0][7] ?? 'G';

        echo json_encode([
            'nom' => $_SESSION['nom_usu'],
            'type' => $_SESSION['type']
        ]);

        if($_POST['check'] === 1){
            setcookie('email', $_POST['email'], time() + (30*24*3600));

            echo json_encode(['cookies' => true]);
        }
    }
}

function logOutUser(){
    $_SESSION = array();

    session_destroy();
}

function submitContactData(){
    require_once('../vendor/autoload.php');

    $mail = new PHPMailer(true);

    try{
        $mail->isSMTP();
        $mail->Host       = 'smtp.aeroelite.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@aeroelite.com';
        $mail->Password   = '12345';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Remitente y destinatario
        $mail->setFrom('info@aeroelite.com', 'AeroElite S.L.');
        $mail->addAddress($_POST['email']);

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = 'Confirmación de Contacto';
        $mail->Body    = '<h1>Gracias por ponerte en contacto con nosotros</h1><p>Nos pondremos en contacto contigo a mayor brevedad posible</p>';
        $mail->AltBody = 'Gracias por ponerte en contacto con nosotros. Nos pondremos en contacto contigo a mayor brevedad posible';

        $mail->send();
    }catch(Exception $e){
        echo json_encode(['err' => $mail->ErrorInfo]);
    }
}

?>