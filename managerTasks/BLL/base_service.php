<?php

class base_service {

    function init_user($user) {
        $new_user = array();
        $new_user['userId'] = $user['id'];
        $new_user['userName'] = $user['userName'];
        $new_user['email'] = $user['email'];
        $new_user['departmentId'] = $user['departmentUserId'];
        $new_user['numHoursWork'] = $user['numHourWork'];
        $new_user['managerId'] = $user['managerId'];

        if (array_key_exists('department', $user)) {
            $new_user['departmentUser'] = array();
            if (array_key_exists('department_id', $user))
                $new_user['departmentUser']['id'] = $user['department_id'];
            $new_user['departmentUser']['department'] = $user['department'];
        }
        if (array_key_exists('managerUserName', $user)) {
            $new_user['manager'] = array();
            $new_user['manager']['userId'] = $user['managerId'];
            $new_user['manager']['userName'] = $user['managerUserName'];
            $new_user['manager']['email'] = $user['managerEmail'];
            $new_user['manager']['numHoursWork'] = $user['managerNumHourWork'];
        }
        return $new_user;
    }

    function init_project($project) {
        $new_project = array();
        $new_project['projectId'] = $project['projectId'];
        $new_project['projectName'] = $project['name'];
        $new_project['customerName'] = $project['customerName'];
        $new_project['numHourForProject'] = $project['numHour'];
        $new_project['dateBegin'] = $project['dateBegin'];
        $new_project['dateEnd'] = $project['dateEnd'];
        $new_project['isFinish'] = $project['isFinish'];
        $new_project['idManager'] = $project['managerId'];
        if (array_key_exists('userName', $project)) {
            $new_project['manager'] = array();
            $new_project['manager']['userName'] = $project['userName'];
        }
        return $new_project;
    }

    function init_worker_project($worker_project) {
        $new_worker_project = array();
        $new_worker_project['projectId'] = $worker_project['projectId'];
        $new_worker_project['userId'] = $worker_project['id'];
        $new_worker_project['projectName'] = $worker_project['customerName'];
        $new_worker_project['hoursForProject'] = $worker_project['hoursForProject'];
        if (array_key_exists('sumHoursDone', $worker_project))
            $new_worker_project['sumHoursDone'] = $worker_project['sumHoursDone'];
        if (array_key_exists('dateBegin', $worker_project))
            $new_worker_project['project'] = $this->init_project($worker_project);
        if (array_key_exists('userName', $worker_project)) {
            $new_worker_project['user'] = $this->init_user($worker_project);
        }
        return $new_worker_project;
    }

    function init_department($department) {
        $new_department = array();
        $new_department['id'] = $department['id'];
        $new_department['department'] = $department['department'];
        return $new_department;
    }

    function init_department_hours($department_hours) {
        $new_department_hours = array();
        $new_department_hours['projectId'] = $department_hours['projectId'];
        $new_department_hours['departmentId'] = $department_hours['departmentId'];
        $new_department_hours['sumHours'] = $department_hours['sumHours'];
        $new_department_hours['departmentUser'] = array();
        $new_department_hours['departmentUser']['id'] = $department_hours['id'];
        $new_department_hours['departmentUser']['department'] = $department_hours['department'];
        return $new_department_hours;
    }

    function init_report($project_report) {
        $new_report = array();
        $new_report['id'] = $project_report['projectId'];
        $new_report['name'] = $project_report['name'];
        $new_report['customerName'] = $project_report['customerName'];
        $new_report['dateBegin'] = $project_report['dateBegin'];
        $new_report['dateEnd'] = $project_report['dateEnd'];
        $new_report['totalHours'] = $project_report['numHour'];
        $new_report['sumHoursDo'] = $project_report['sumHourDo'];
        $new_report['precentsDone'] = $project_report['presentDoing'];
        $new_report['daysleft'] = $project_report['numDaysStay'];
        $new_report['isFinish'] = $project_report['isFinish'];
        $new_report['teamLeader'] = $project_report['userName'];
        return $new_report;
    }

    function init_project_department_report($project_department) {
        $new_project_department = array();
        $new_project_department['id'] = $project_department['id'];
        $new_project_department['name'] = $project_department['department'];
        $new_project_department['totalHours'] = $project_department['sumHours'];
        $new_project_department['sumHoursDo'] = $project_department['sumHoursDone'];
        $new_project_department['precentsDone'] = $project_department['precentsDone'];
        return $new_project_department;
    }

    function init_workers_project_report($workers_project_report) {
        $new_workers_project_report = array();
        $new_workers_project_report['id'] = $workers_project_report['id'];
        $new_workers_project_report['name'] = $workers_project_report['userName'];
        $new_workers_project_report['totalHours'] = $workers_project_report['TotalHours'];
        $new_workers_project_report['sumHoursDo'] = $workers_project_report['sumHours'];
        $new_workers_project_report['precentsDone'] = $workers_project_report['precentDone'];
        return $new_workers_project_report;
    }

    function init_worker_report($worker_report) {
        $new_workers_project_report = array();
        $new_workers_project_report['id'] = $worker_report['id'];
        $new_workers_project_report['name'] = $worker_report['userName'];
        $new_workers_project_report['department'] = $worker_report['department'];
        $new_workers_project_report['teamLeader'] = $worker_report['teamleader'];
        $new_workers_project_report['totalHours'] = $worker_report['numHourWork*5*4'];
        return $new_workers_project_report;
    }

    function init_worker_details_report($worker_details) {
        $new_workers_project_report = array();
        $new_workers_project_report['year'] = $worker_details['year'];
        $new_workers_project_report['month'] = $worker_details['month'];
        $new_workers_project_report['name'] = $worker_details['name'];
        $new_workers_project_report['totalHours'] = $worker_details['totalHours'];
        $new_workers_project_report['sumHoursDo'] = $worker_details['hourDo'];
        $new_workers_project_report['sumHoursDoMonth'] = $worker_details['doingMonth'];
        return $new_workers_project_report;
    }

    function format_date($date, $format = 'Y-m-d') {
        $format_date = date($format, strtotime($date));
        return "'$format_date'";
    }

    function send_email($to, $from, $subject, $body) {
        $headers = "From: " . $from . "\r\n";
        $headers .= "Reply-To: " . $from . "\r\n";
        $headers .= "CC: susan@example.com\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        return mail($to, $subject, $body, $headers);
    }

}
