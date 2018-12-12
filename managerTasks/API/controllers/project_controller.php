<?php

class project_controller extends validation {

    var $project_service;

    function __construct() {
        $this->project_service = new project_service();
    }

    function get_all_projects() {
        return $this->project_service->get_all_projects();
    }

    //add validation date-unique
    function add_project($project) {

       // if ($this->validation_text($project['projectName'], "", 2, 15, 'nameProject'))
         //   return http_response_code(422);
       // if ($this->validation_text($project['customerName'], "", 2, 15, 'customerName'))
           // return http_response_code(422);
       // if ($this->validation_int($project['numHourForProject'], 'numHourForProject', 2, 80000))
           // return http_response_code(422);

        return $this->project_service->add_project($project);
    }

    function delete_project($project_id) {
        return $this->project_service->delete_project($project_id);
    }

    function get_projects_by_teamLeader($teamleader_id) {
        return $this->project_service->get_projects_by_teamLeader($teamleader_id);
    }

        //add validation date
    function update_project($params) {
//        if ($this->validation_text($project['projectName'], "", 2, 15, 'nameProject'))
//            return http_response_code(422);
//        if ($this->validation_text($project['customerName'], "", 2, 15, 'customerName'))
//            return http_response_code(422);
//        if ($this->validation_int($project['numHourForProject'], 'numHourForProject', 2, 80000))
//            return http_response_code(422);
        return $this->project_service->update_project($params);
    }

    function create_project_report() {
        return $this->project_service->create_report_project();
    }

}
