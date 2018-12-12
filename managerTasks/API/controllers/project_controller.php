<?php

class project_controller extends validation {

    var $project_service;

    function __construct() {
        $this->project_service = new project_service();
    }

    function get_all_projects() {
        return $this->project_service->get_all_projects();
    }

    function add_project($project) {
        return $this->project_service->add_project($project);
    }

    function delete_project($project_id) {
        return $this->project_service->delete_project($project_id);
    }

    function get_projects_by_teamLeader($teamleader_id) {
        return $this->project_service->get_projects_by_teamLeader($teamleader_id);
    }

    function update_project($params) {
        return $this->project_service->update_project($params);
    }

    function create_project_report() {
        return $this->project_service->create_report_project();
    }

}
