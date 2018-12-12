<?php

class department_service extends base_service {
    
     function get_departments($query) {
        $departments = db_access:: run_reader($query, function ($model) {
                    return $this->init_department($model);
                });
           return $departments;
    }
    
    //good
    function get_all_department()
    {
         $query ='SELECT * FROM  department';
         return $this->get_departments($query);
    }
}
