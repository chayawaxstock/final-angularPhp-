<?php

class user_controller extends validation {

    var $user_service;

    function __construct() {
        $this->user_service = new user_service();
    }

    function get_all_users() {
        return $this->user_service->get_all_users();
    }

    function login_by_password($params) {
        return $this->user_service->login_by_password($params);
    }

    function login_by_ip($ip) {
        return $this->user_service->login_by_ip($ip);
    }

    function forgot_password($user_name) {
        return $this->user_service->forgot_password($user_name);
    }

    function add_user($user) {
        return $this->user_service->add_user($user);
    }

    function delete_user($user_id) {
        return $this->user_service->delete_user($user_id);
    }

    function hours_user_done_projects($user_id) {
        return $this->user_service->hours_done_user_by_projects($user_id);
    }

    function get_users_by_department($department_name) {
        return $this->user_service->get_users_by_department($department_name);
    }

    function update_user($params) {
        return $this->user_service->update_user($params);
    }

    function create_workers_report() {
        return $this->user_service->create_workers_report();
    }

    function send_email_manager($user_id, $subject, $body) {
        return $this->user_service->send_email_manager($user_id, $subject, $body);
    }

    function change_password($requestId, $user) {
        return$this->user_service->change_password($requestId, $user);
    }

}
