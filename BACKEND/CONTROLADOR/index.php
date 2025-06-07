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
    echo json_encode([
        'type' => $_SESSION['type'] ?? 'G',
    ]);
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


// DESACTIVADO PORQUE EL CORREO NO EXISTE

// function submitContactData(){
//     require_once('../vendor/autoload.php');

//     $mail = new PHPMailer(true);

//     try{

//         $mail->isSMTP();
//         $mail->Host       = 'smtp.aeroelite.com';
//         $mail->SMTPAuth   = true;
//         $mail->Username   = 'info@aeroelite.com';
//         $mail->Password   = '12345';
//         $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
//         $mail->Port       = 587;

//         // Remitente y destinatario
//         $mail->setFrom('info@aeroelite.com', 'AeroElite S.L.');
//         $mail->addAddress($_POST['email']);

//         // Contenido
//         $mail->isHTML(true);
//         $mail->Subject = 'Confirmación de Contacto';
//         $mail->Body    = '<h1>Gracias por ponerte en contacto con nosotros</h1><p>Nos pondremos en contacto contigo a mayor brevedad posible</p>';
//         $mail->AltBody = 'Gracias por ponerte en contacto con nosotros. Nos pondremos en contacto contigo a mayor brevedad posible';

//         $mail->send();
//     }catch(Exception $e){
//         echo json_encode(['err' => $mail->ErrorInfo]);
//     }
// }

function obtainFleet(){
    require_once('../MODELOS/class.avion.php');

    $hoy = date('Y/m/d');

    $avion = new Avion();
    $aviones = $avion->getFleet($hoy);

    echo json_encode(['aviones' => $aviones]);
}

function obtainMemberships(){
    require_once('../MODELOS/class.membership.php');

    $membership = new Membership();
    $membresias = $membership->getMemberships();

    echo json_encode(['memberships' => $membresias]);
}

function updateMembership(){
    require_once('../MODELOS/class.user.php');

    $user = new User();
    $user->updateMemberships($_POST['membership'], $_SESSION['nom_usu']);
}

function getMembershipForBooking(){
    require_once('../MODELOS/class.user.php');

    $user = new User();
    $member = $user->getMembership($_SESSION['nom_usu']);

    echo json_encode(['membership' => $member]);
}

function bookFlight(){
    require_once('../MODELOS/class.viaje.php');
    require_once('../MODELOS/class.user.php');

    $user = new User();
    $data = $user->getUser($_SESSION['nom_usu']);

    $viaje = new Viaje();
    $res = $viaje->insertViaje($data[0][0], $_POST['plane'], $_POST['fecha'], $_POST['salida'], $_POST['llegada'], $_POST['distancia'], $_POST['duracion'], $_POST['precio']);

    echo json_encode(['res' => $res]);
}

function dataDashboard(){
    require_once('../MODELOS/class.viaje.php');
    require_once('../MODELOS/class.user.php');

    $user = new User();
    $data = $user->getUser($_SESSION['nom_usu']);

    $viaje = new Viaje();
    $viajes = $viaje->getViajesByUser($_SESSION['nom_usu']);

    echo json_encode([
        'dni' => $data[0][0],
        'nom' => $data[0][1],
        'ape' => $data[0][2],
        'email' => $data[0][3],
        'nom_u' => $data[0][4],
        'h_vuelo' => $data[0][5],
        'member' => $data[0][6],
        'viajes' => $viajes
    ]);
}

function obtainViajes(){
    require_once('../MODELOS/class.viaje.php');

    $viaje = new Viaje();
    $viajes = $viaje->getViajes();

    echo json_encode(['viajes' => $viajes]);
}

function cancelViaje(){
    require_once('../MODELOS/class.viaje.php');

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    $nom_usu = $input['nom_usu'] ?? null;
    $matricula = $input['matricula'] ?? null;
    $fecha = $input['fecha'] ?? null;

    if (!$nom_usu || !$matricula || !$fecha) {
        echo json_encode(['canceled' => 'false', 'error' => 'Faltan parámetros']);
        return;
    }

    $viaje = new Viaje();
    $res = $viaje->cancelViajes($nom_usu, $matricula, $fecha);

    echo json_encode(['canceled' => $res]);
}

function obtainFleetForMaintenance(){
    require_once('../MODELOS/class.avion.php');

    $avion = new Avion();
    $aviones = $avion->getFleetWoRes();

    echo json_encode(['aviones' => $aviones]);
}

function obtainMaintenances(){
    require_once('../MODELOS/class.maintenance.php');

    $mant = new Maintenance();
    $mantenimientos = $mant->getMantenimientos();

    echo json_encode(['mantenimientos' => $mantenimientos]);
}

?>