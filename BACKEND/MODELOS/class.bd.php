<?php

class bd{
    private $con;

    //CONSTRUCTOR
    public function __construct(){
        require_once('../../BD/cred.php');

        $this->con = new mysqli('localhost', USU_CON, PSW_CON, 'aeroelite');
    }

    //FUNCTIONS
    public function getConexion(){
        return $this->con;
    }
}

?>