<?php

class routes_loader {

    var $methods;
    var $user_controller;
    var $project_controller;
    var $customer_controller;
    var $department_controller;
    var $project_worker_controller;
    var $presence_hours_controller;

    public function __construct() {
        $this->user_controller = new user_controller();
        $this->project_controller = new project_controller();
        $this->department_controller = new department_controller();
        $this->project_worker_controller = new projectworker_controller();
        $this->presence_hours_controller = new presenceday_controller();

        $this->methods = array(
            'user' => $this->get_users_methods(),
            'project' => $this->get_projects_methods(),
            'department' => $this->get_departments_methods(),
            'projectworker' => $this->get_project_worker_methods(),
            'presenceday' => $this->get_presence_day_methods()
        );
    }

    function invoke($controller_name, $method_name, $params) {

        $data = $this->methods[$controller_name][$method_name]($params);
        return json_encode($data);
    }

    function get_users_methods() {
        return array(
            'getAllUsers' => function ($params) {
                return $this->user_controller->get_all_users();
            },
            'forgetPassword' => function ($params) {
                return $this->user_controller->forgot_password($params['userName']);
            },
            'getHoursForUserProjects' => function ($params) {
                return $this->user_controller->hours_user_done_projects($params['userId']);
            },
            'getUsersByDepartment' => function ($params) {
                return $this->user_controller->get_users_by_department($params['departmentName']);
            },
            'loginByPassword' => function ($params) {
                return $this->user_controller->login_by_password($params);
            },
            'addUser' => function ($params) {
                return $this->user_controller->add_user($params);
            },
            'deleteUser' => function ($params) {
                return $this->user_controller->delete_user($params['userId']);
            },
            'updateUser' => function ($params) {
                return $this->user_controller->update_user($params);
            },
            'loginByIp' => function ($params) {
                return $this->user_controller->login_by_ip($params["ip"]);
            },
            'changePassword' => function ($params) {
                return $this->user_controller->change_password($params["requestId"], $params["user"]);
            },
            'sendMessageToManagers' => function ($params) {
                return $this->user_controller->send_email_manager($params["userId"], $params["subject"], $params["body"]);
            }
        );
    }

    function get_projects_methods() {
        return array(
            'getAllProjects' => function ($params) {

                return $this->project_controller->get_all_projects();
            },
            'addProject' => function ($params) {

                return $this->project_controller->add_project($params);
            },
            'deleteProject' => function ($params) {
                return $this->project_controller->delete_project($params['projectId']);
            },
            'getProjectById' => function ($params) {
                // return $this->project_controller->get_project_by_id($params['projectId']);
            },
            'getProjectsByTeamLeaderId' => function ($params) {
                return $this->project_controller->get_projects_by_teamLeader($params['teamLeaderId']);
            },
            'createReports' => function ($param) {
                if ($param['idReport'] == 1)
                    return $this->project_controller->create_project_report();
                return $this->user_controller->create_workers_report();
            },
            'getProjectsManager' => function ($param) {
                return $this->project_controller->get_projects_by_teamLeader($param['teamLeaderId']);
            }
            , 'updateProject' => function ($param) {
                return $this->project_controller->update_project($param['project']);
            }
        );
    }

    function get_departments_methods() {
        return array(
            'getAllDepartments' => function ($params) {
                return $this->department_controller->get_all_departments();
            }
        );
    }

    function get_project_worker_methods() {
        return array(
            'getWorkersNotInProject' => function ($params) {
                return $this->project_worker_controller->get_workers_not_in_project($params['projectId']);
            },
            'getWorkersInProject' => function ($params) {
                return $this->project_worker_controller->get_workers_in_project($params['projectId']);
            },
            'getUsersTeamLeaderProject' => function ($params) {

                return $this->project_worker_controller->get_users_teamLeader_project($params['teamleaderId'], $params['projectId']);
            },
            'getSumStayByProjectAndDepartment' => function ($params) {
                return $this->project_worker_controller->get_sum_stay_by_project_and_department($params['projectId']);
            },
            'getProjectsByUserId' => function ($params) {
                return $this->project_worker_controller->projects_user($params['userId']);
            },
            'getUsersBelongProject' => function ($params) {
                return $this->project_worker_controller->get_users_belong_project($params['projectId']);
            }
            , 'getSumHoursDoneForUsers' => function ($params) {
                return $this->project_worker_controller->get_sum_hours_done_users($params['projectId'], $params['teamLeaderId']);
            },
            'addWorkersToProject' => function ($params) {

                return $this->project_worker_controller->add_workers_to_project($params['projectId'], $params['workers']);
            },
            'updateProjectHoursForUser' => function ($params) {

                return $this->project_worker_controller->update_project_hours_for_user($params);
            },
        );
    }

    function get_presence_day_methods() {
        return array(
            'updatePresenceDayWorker' => function ($params) {

                return $this->presence_hours_controller->update_presenceday_worker($params);
            }
            ,
            'addPresent' => function ($params) {
                return $this->presence_hours_controller->add_present($params);
            }
        );
    }

}
