<?php

class Maintenance{
    private $con;

    //CONSTRUCTOR
    public function __construct(){
        require_once('class.bd.php');

        $this->con = (new bd())->getConexion();
    }

    //FUNCTIONS
    function getMantenimientos(){
        $sentencia = 'select * from mantenimiento_av';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_result($avion, $fecha, $tipo, $costo);
        $consulta->execute();

        $resultado = $consulta->get_result();
        $mantenimientos = array();

        while ($fila = $resultado->fetch_assoc()) {
            $mantenimientos[] = $fila;
        }

        $consulta->close();

        return $mantenimientos;
    }
}
?>