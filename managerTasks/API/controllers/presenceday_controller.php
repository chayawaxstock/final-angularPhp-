<?php

class presenceday_controller {

    var $presenceday_service;

    function __construct() {
        $this->presenceday_service = new presenceday_service();
    }
    
      function update_presenceday_worker($presence_day){
	return $this->presenceday_service->update_presenceday_worker($presence_day);
    }
     function  add_present($pressantDay){

        return $this->presenceday_service->add_present($pressantDay);
    }
}

