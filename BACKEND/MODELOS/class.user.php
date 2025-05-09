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

        $consulta->close();

        return $userInfo;
    }

    public function getNomUsu($email){
        $sentencia = 'select nom_usu from usuarios where email = ?';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('s', $email);
        $consulta->bind_result($nom);
        $consulta->execute();

        $nom_u = '';

        if($consulta->fetch()){
            $nom_u = $nom;
        }

        $consulta->close();

        return $nom_u;
    }

    public function validateLogIn($email, $pss){
        $sentencia = 'select email from usuarios where password = ?';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('s', $pss);
        $consulta->bind_result($mail);
        $consulta->execute();

        if($consulta->fetch()){
            if($mail === $email){
                $consulta->close();

                return true;
            }else{
                $consulta->close();

                return false;
            }
        }
    }

    public function signInNewUser($id, $nom, $ape, $email, $nom_u, $pass){
        $sentencia = 'select count(nom_usu) from usuarios where nom_usu = ?';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('s', $nom_u);
        $consulta->bind_result($cont);
        $consulta->execute();

        if($consulta->fetch() && $cont > 0){
            $consulta->close();

            return false;
        }else{
            $consulta->close();

            $sentencia = 'insert into usuarios values (?,?,?,?,?,?, 0, 0, "R")';

            $consulta = $this->con->prepare($sentencia);
            $consulta->bind_param('ssssss', $id, $nom, $ape, $email, $nom_u, $pass);
            $consulta->execute();

            if($consulta->affected_rows > 0){
                $consulta->close();

                return true;
            }else{
                $consulta->close();

                return false;
            }
        }
    }
}

?>