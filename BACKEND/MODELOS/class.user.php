<?php

class User{
    private $con;

    //CONSTRUCTOR
    public function __construct(){
        require_once('./class.bd.php');

        $this->con = (new bd())->getConexion();
    }

    //FUNCTIONS
    public function getUser($nom_u){
        $sentencia = 'select * from usuarios where nom_usu = ?';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('s', $nom_u);
        $consulta->bind_result($dni, $nombre, $apellidos, $nom_usu, $h_vuelo, $membresia, $tipo);
        $consulta->execute();

        $userInfo = array();

        while($consulta->fetch()){
            array_push($userInfo, [$dni, $nombre, $apellidos, $nom_usu, $h_vuelo, $membresia, $tipo]);
        }

        return $userInfo;
    }
}

?>