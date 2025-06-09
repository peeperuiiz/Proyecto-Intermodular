<?php

class User{
    private $con;

    //CONSTRUCTOR
    public function __construct(){
        require_once('class.bd.php');

        $this->con = (new bd())->getConexion();
    }

    //FUNCTIONS
    public function getAllUsers(){
        $sentencia = 'select dni, nombre, apellidos, email, nom_usu, h_vuelo, membresia, tipo from usuarios';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_result($dni, $nombre, $apellidos, $email, $nom_usu, $h_vuelo, $membresia, $tipo);
        $consulta->execute();

        $resultado = $consulta->get_result();
        $usuarios = array();

        while ($fila = $resultado->fetch_assoc()) {
            $usuarios[] = $fila;
        }

        return $usuarios;
    }

    public function getUser($nom_u){
        $sentencia = 'select dni, nombre, apellidos, email, nom_usu, h_vuelo, membresia, tipo from usuarios where nom_usu = ?';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('s', $nom_u);
        $consulta->bind_result($dni, $nombre, $apellidos, $email, $nom_usu, $h_vuelo, $membresia, $tipo);
        $consulta->execute();

        $userInfo = array();

        while($consulta->fetch()){
            array_push($userInfo, [$dni, $nombre, $apellidos, $email, $nom_usu, $h_vuelo, $membresia, $tipo]);
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
        $sentencia = 'select email from usuarios where password = ? and email = ?';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('ss', $pss, $email);
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

            $sentencia = 'insert into usuarios values (?,?,?,?,?,?, 0, 1, "R")';

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

    public function updateMemberships($nom, $nom_usu){
        $sentencia = 'select id from membresias where nombre = ?';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('s', $nom);
        $consulta->bind_result($id);
        $consulta->execute();

        if(!$consulta->fetch()){
            $consulta->close();

            return false;
        }else{
            $consulta->close();

            $sentencia = 'update usuarios set membresia = ? where nom_usu = ?';

            $consulta = $this->con->prepare($sentencia);
            $consulta->bind_param('is', $id, $nom_usu);
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

    public function getMembership($nom_usu){
        $sentencia = 'select membresia from usuarios where nom_usu = ?';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('s', $nom_usu);
        $consulta->bind_result($member);
        $consulta->execute();

        if($consulta->fetch()){
            return $member;
        }else{
            return false;
        }
    }

    public function updateHorasVuelo($horas, $nom_usu){
        $sentencia = 'update usuarios set h_vuelo = h_vuelo + ? where nom_usu = ?';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('is', $horas, $nom_usu);
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

?>