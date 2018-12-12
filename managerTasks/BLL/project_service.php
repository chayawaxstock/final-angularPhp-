<?php

class project_service extends base_service {

    function get_projects($query) {
        $projects = db_access:: run_reader($query, function ($model) {
                    return $this->init_project($model);
                });

        return $projects;
    }

    function get_project_report($query) {
        $report_projects = db_access:: run_reader($query, function ($model) {
                    return $this->init_report($model);
                });
        return $report_projects;
    }

    function get_hours_departments($query) {
        $departments_projects = db_access:: run_reader($query, function ($model) {
                    return $this->init_department_hours($model);
                });
        return $departments_projects;
    }

    function get_all_projects() {

        $query = 'SELECT p.*,u.* FROM managertasks.project p join user u on u.id=p.managerId';
        $projects = $this->get_projects($query);
        foreach ($projects as $item) {
            $item['hoursForDepartment'] = $this->get_hours_departments_project($item['projectId']);
            $new_projects[] = $item;
        }
        return $new_projects;
    }

    function add_project($project) {
        $format = 'Y-m-d';

        $dateBegin = date('Y-m-d', strtotime($project['dateBegin']));
        $dateEnd = date('Y-m-d', strtotime($project['dateEnd']));

        $IsFinish = ($project['isFinish'] ? 1 : 0);
        $numHour = $project['numHourForProject'];
        $name = $project['projectName'];
        $customerName = $project['customerName'];
        $managerId = $project['idManager'];
//        start transaction;
        $query = " INSERT INTO `managertasks`.`project`(`numHour`,`name`,`dateBegin`,`dateEnd`,`isFinish`,`customerName`,`managerId`) VALUES('$numHour','$name','$dateBegin','$dateEnd',$IsFinish,'$customerName',$managerId) ";

        $result = db_access::run_non_query($query);
        if ($result->affected_rows > 0) {
            $insert_id = $result->insert_id;
            foreach ($project['hoursForDepartment'] as &$value) {
                $departmentId = $value['departmentId'];
                $sumHours = $value['sumHours'];
                $query = "INSERT INTO `managertasks`.`hourfordepartment`(`projectId`,`departmentId`,`sumHours`)VALUES($insert_id,$departmentId,$sumHours)";
                $result = db_access::run_non_query($query);
            }
        }
        return $result;
    }

    function delete_project($projectId) {

        $query = "DELETE FROM `managertasks`.`project`WHERE projectId =$projectId";
        return db_access::run_non_query($query);
    }

    //not good
    function create_report_project() {
        $query = "CALL `managertasks`.`report`('reportProject');";
        $report_projects = $this->get_project_report($query);
        foreach ($report_projects as $item) {
            $item['items'] = $this->get_departments_workers_project_report($item['id']);
            $new_report_projects[] = $item;
        }

        return $new_report_projects;
    }

    function get_projects_by_teamLeader($teamleader_id) {
        $query = "SELECT * FROM managertasks.project WHERE managerId =$teamleader_id";
        $projects = $this->get_projects($query);
        foreach ($projects as $item) {
            $item['hoursForDepartment'] = $this->get_hours_departments_project($item['projectId']);
            $new_projects_team[] = $item;
        }

        return $new_projects_team;
    }

    function get_hours_departments_project($project_id) {
        $query = "SELECT * FROM managertasks.hourfordepartment h JOIN department d ON d.id=h.departmentId WHERE h.projectId=$project_id;";
        $departments_hours = $this->get_hours_departments($query);
        return $departments_hours;
    }

    function get_workers_by_department_and_project($department_id, $project_id) {
        $query = "SELECT * FROM managertasks.sumhoursforuserproject WHERE projectId=$project_id and departmentUserId=$department_id";
        $workers_project_report = db_access::run_reader($query, function ($model) {
                    return $this->init_workers_project_report($model);
                });
        return $workers_project_report;
    }

    function get_departments_workers_project_report($project_id) {
        $query = "CALL `managertasks`.`departmensProject`({$project_id});";
        $department_report = db_access::run_reader($query, function ($model) {
                    return $this->init_project_department_report($model);
                });
        foreach ($department_report as $item) {
            $item['items'] = $this->get_workers_by_department_and_project($item['id'], $project_id);
            foreach ($item['items'] as $item1) {
                $item['sumHoursDo'] += $item['sumHoursDo'];
            }
            $new_workers_project_report[] = $item;
        }
        return $new_workers_project_report;
    }

    function update_project($project) {

        $dateBegin = date('Y-m-d', strtotime($project['dateBegin']));
        $dateEnd = date('Y-m-d', strtotime($project['dateEnd']));
        $query = "UPDATE managertasks.project SET numHour='{$project['numHourForProject']}',name='{$project['projectName']}',dateBegin='{$dateBegin}' ,dateEnd='{$dateEnd}' ,isFinish={$project['finish']},customerName='{$project['customerName']}'  WHERE projectId={$project['projectId']}";
        $result = db_access::run_non_query($query)->affected_rows;
        if ($result > 0) {

            foreach ($project['hoursForDepartment'] as &$value) {
                $departmentId = $value['departmentId'];
                $sumHours = $value['sumHours'];
                $query = "UPDATE  `managertasks`.`hourfordepartment` set sumHours={$value['sumHours']}  where departmentId={$value['departmentId']}  and projectId={$project['projectId']}";
                $result = db_access::run_non_query($query);
            }
            return $result;
        }
//        if ($result > 0) {
//            return http_response_code(204);
//        } else {
//            return http_response_code(422);
//        }
    }

}
