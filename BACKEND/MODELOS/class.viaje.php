<?php

class Viaje{
    private $con;

    //CONSTRUCTOR
    public function __construct(){
        require_once('class.bd.php');

        $this->con = (new bd())->getConexion();
    }

    //FUNCTIONS
    function insertViaje($usu, $avion, $fecha, $salida, $llegada, $distancia, $duracion, $precio){
        $sentencia = 'insert into viajes values (?,?,?,?,?,?,?,?)';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('sssssidi', $usu, $avion, $fecha, $salida, $llegada, $distancia, $duracion, $precio);
        $consulta->execute();

        if($consulta->affected_rows > 0){
            $consulta->close();

            return true;
        }else{
            $consulta->close();

            return false;
        }
    }

    function getViajes(){
        $sentencia = 'select nom_usu, matricula, marca, modelo, fecha, salida, llegada, distancia, duracion, precio from usuarios, aviones, viajes where dni = usuario and matricula = avion';
        
        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_result($nom_u, $matricula, $marca, $modelo, $fecha, $salida, $llegada, $distancia, $duracion, $precio);
        $consulta->execute();

        $resultado = $consulta->get_result();
        $viajes = array();

        while ($fila = $resultado->fetch_assoc()) {
            $viajes[] = $fila;
        }

        return $viajes;
    }

    function getViajesByUser($nom_u){
        $sentencia = 'select nom_usu, marca, modelo, fecha, salida, llegada, distancia, duracion, precio from usuarios, aviones, viajes where dni = usuario and matricula = avion and nom_usu = ?';
        
        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('s', $nom_u);
        $consulta->bind_result($nom_usu, $marca, $modelo, $fecha, $salida, $llegada, $distancia, $duracion, $precio);
        $consulta->execute();

        $resultado = $consulta->get_result();
        $viajes = array();

        while ($fila = $resultado->fetch_assoc()) {
            $viajes[] = $fila;
        }

        $consulta->close();

        return $viajes;
    }

    function cancelViajes($user, $matricula, $fecha){
        $sentencia = 'delete from viajes where usuario = ? and avion = ? and fecha = ?';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('sss', $user, $matricula, $fecha);
        $consulta->execute();

        if ($consulta->affected_rows > 0) {
            $consulta->close();

            return true;
        }else{
            $consulta->close();

            return false;
        }
    }
}

?>