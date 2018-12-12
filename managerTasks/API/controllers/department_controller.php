<?php

class department_controller {
    
     var $department_service;

    function __construct() {
        $this->department_service = new department_service();
    }
    
      function get_all_departments() {
        return $this->department_service->get_all_department();
    }
}


