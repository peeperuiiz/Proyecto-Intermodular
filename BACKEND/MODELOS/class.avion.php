<?php

class Avion{
    private $con;

    //CONSTRUCTOR
    public function __construct(){
        require_once('class.bd.php');

        $this->con = (new bd())->getConexion();
    }

    //FUNCTIONS
    function getFleet($hoy){
        $sentencia = 'select * from aviones where matricula not in (select avion from viajes where fecha > ?)';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('s', $hoy);
        $consulta->bind_result($matricula, $marca, $modelo, $rango_max, $rango_min, $img);
        $consulta->execute();

        $resultado = $consulta->get_result();
        $aviones = array();

        while ($fila = $resultado->fetch_assoc()) {
            $aviones[] = $fila;
        }

        return $aviones;
    }
}
?>