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
        $sentencia = 'INSERT INTO viajes VALUES (?,?,?,?,?,?,?,?)';

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
}

?>