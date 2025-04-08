<?php

class bd{
    // VARIABLES
    private $con;

    //CONSTRUCTOR
    public function __construct(){
        require_once('../../BD/cred.php');

        $this->con = new mysqli('localhost', USU_CON, PSW_CON, 'aeroelite');
    }

    //FUNCIONES
    public function getConexion(){
        return $this->con;
    }
}

?>