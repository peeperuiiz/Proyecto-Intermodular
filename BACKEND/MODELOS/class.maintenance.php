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
        $consulta->bind_result($avion, $fecha, $orden, $tipo, $costo);
        $consulta->execute();

        $resultado = $consulta->get_result();
        $mantenimientos = array();

        while ($fila = $resultado->fetch_assoc()) {
            $mantenimientos[] = $fila;
        }

        $consulta->close();

        return $mantenimientos;
    }

    function insertMantenimientos($avion, $fecha, $tipo, $precio){
        $sentencia = 'insert into mantenimiento_av (avion, fecha, tipo_mant, costo) values (?,?,?,?)';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_param('sssi', $avion, $fecha, $tipo, $precio);
        $consulta->execute();

        if($consulta->affected_rows > 0){
            $consulta->close();

            return true;
        }else{
            $consulta->close();

            return false;
        }
    }

    function getChartParams(){
        $sentencia = 'SELECT
                        (SELECT COUNT(DISTINCT m.avion)
                        FROM mantenimiento_av m
                        WHERE m.tipo_mant = "Rutinario") AS Routine,
                        
                        (SELECT COUNT(DISTINCT m.avion)
                        FROM mantenimiento_av m
                        WHERE m.tipo_mant = "Preventivo") AS Preventive,
                        
                        (SELECT COUNT(DISTINCT m.avion)
                        FROM mantenimiento_av m
                        WHERE m.tipo_mant = "Correctivo") AS Corrective,
                        
                        (SELECT COUNT(*) 
                        FROM aviones a 
                        WHERE a.matricula NOT IN (
                            SELECT DISTINCT avion FROM mantenimiento_av
                        )) AS Unmaintained;';

        $consulta = $this->con->prepare($sentencia);
        $consulta->bind_result($rutinario, $preventivo, $correctivo, $nada);
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