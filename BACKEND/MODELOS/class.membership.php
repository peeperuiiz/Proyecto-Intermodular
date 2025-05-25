<?php

class Membership{
    private $con;

    //CONSTRUCTOR
    public function __construct(){
        require_once('class.bd.php');

        $this->con = (new bd())->getConexion();
    }

    //FUNCTIONS
    function getMemberships(){
        $sentencia = 'select * from membresias where id != 1';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_result($id, $nom, $descripcion, $h_vuelo, $rango, $precio, $ruta);
        $consulta->execute();

        $resultado = $consulta->get_result();
        $membresias = array();

        while ($fila = $resultado->fetch_assoc()) {
            $membresias[] = $fila;
        }

        return $membresias;
    }
}

?>