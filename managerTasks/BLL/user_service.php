<?php

class user_service extends base_service {

    function get_workers_projects($query) {
        $workers_projects = db_access:: run_reader($query, function ($model) {
                    return $this->init_worker_project($model);
                });
        return $workers_projects;
    }

    function get_users($query) {
        $users = db_access:: run_reader($query, function ($model) {
                    return $this->init_user($model);
                });
        return $users;
    }

    function get_workers_report($query) {
        $workers = db_access:: run_reader($query, function ($model) {
                    return $this->init_worker_report($model);
                });
        return $workers;
    }

    function get_workers_details_report($query) {
        $workers = db_access:: run_reader($query, function ($model) {
                    return $this->init_worker_details_report($model);
                });
        return $workers;
    }

    function get_all_users() {

        $query = 'SELECT u.*,d.id as department_id,d.department,uu.userName as managerUserName,
                uu.departmentUserId as managerDepartmentUserId,
                uu.email as managerEmail,
                uu.numHourWork as managerNumHourWork
                FROM user u JOIN department d ON u.departmentUserId=d.id
                LEFT JOIN user uu ON u.managerId=uu.id WHERE d.id!=1';
        return $this->get_users($query);
    }

    function login_by_password($params) {
        $query = "SELECT u.*,d.id as department_id,d.department FROM managertasks.user u JOIN managertasks.department d ON u.departmentUserId=d.id WHERE password='{$params['password']}' AND userName='{$params['userName']}'";
        $result = $this->get_users($query)[0];
        if ($result && array_key_exists('ip', $params)) {
            $query = "UPDATE `managertasks`.`user`SET`userComputer` = '{$params['ip']}' WHERE password = '{$params['password']}' ";

            $rows = db_access::run_non_query($query);
        }
        return $result;
    }

    function forget_password($user_name) {
        $query = "SELECT * FROM managertasks.user WHERE userNam='$user_name'";
        return $this->get_users($query);
    }

    function user_by_department($department_name) {
        $query = "SELECT * FROM managertasks.user JOIN managertasks.department ON user.departmentUserId=department.id WHERE Department='$department_name'";
        return $this->get_users($query);
    }

    function sum_hours_done_users($team_leader_id, $project_id) {
        $query = "SELECT sum(sumHours),u.userName FROM presentday p JOIN user u on u.id= p.id WHERE u.managerId =$team_leader_id AND projectId=$project_id GROUP BY u.id";
        return $this->get_users($query);
    }

    function delete_user($userId) {
        $query = "DELETE FROM managertasks.user WHERE id=$userId";
        return db_access::run_non_query($query);
    }

    function hours_user_projects($user_id) {
        $query = "SELECT * FROM sumHoursForUserProject WHERE id=$user_id";
        return $this->get_users($query);
    }

    function hours_for_projects_user($user_id) {
        $query = "SELECT pw.projectId,pw.id,pw.hoursForProject,p.name,u.userName FROM   project p JOIN projectworker pw ON  p.projectId =pw.projectId JOIN user u ON pw.id =u.id WHERE pw.id=$user_id";
        return $this->get_users($query);
    }

    function add_user($user) {
        if ($user['managerId'] == 0 || $user['managerId'] == null)
            $query = "INSERT INTO `managertasks`.`user`(`userName`,`userComputer`,`password`,`departmentUserId`,`email`,`numHourWork`) VALUES('{$user['userName']}','{$user['userComputer']}','{$user['password']}',{$user['departmentId']},'{$user['email']}',{$user['numHoursWork']}); ";
        else
            $query = "INSERT INTO `managertasks`.`user`(`userName`,`userComputer`,`password`,`departmentUserId`,`email`,`numHourWork`,`managerId`) VALUES('{$user['userName']}','{$user['userComputer']}','{$user['password']}',{$user['departmentId']},'{$user['email']}',{$user['numHoursWork']},{$user['managerId']}); ";
        return db_access::run_non_query($query)->affected_rows;
    }

    function worker_hours_do_projects($team_leader_id, $project_id) {
        $query = "SELECT sum(pd.sumHours),u.userName  FROM user u JOIN projectworker pw ON pw.id = u.id LEFT JOIN presentday pd ON pd.id = u.id WHERE u.managerId = $team_leader_id AND pw.projectId = $project_id AND pd.projectId = $project_id GROUP BY pw.projectId ,pw.id ";
        return $this->get_users($query)[0];
    }

    function users_belong_projects($project_id) {
        $query = "SELECT * FROM project p JOIN projectworker pw ON  p.projectId =pw.projectId JOIN user u ON pw.id =u.id WHERE pw.projectId=$project_id AND pw.isActive=true";
        return $this->get_users($query)[0];
    }

    function simple_worker() {
        $query = "SELECT * FROM managertasks.user JOIN managertasks.department ON user.departmentUserId=department.id WHERE Department NOT IN ('teamLeader','manager')";
        return $this->get_users($query)[0];
    }

    function project_manager($team_leader_id) {
        $query = "SELECT * FROM managertasks.project WHERE managerId =$team_leader_id";
        return $this->get_users($query)[0];
    }

    function user_details() {
        $query = "SELECT * FROM managertasks.user JOIN managertasks.department ON user.departmentUserId=department.id WHERE user.id={id}";
        return $this->get_users($query)[0];
    }

    function login_by_ip($ip) {

        $query = "SELECT u.*,d.id as department_id,d.department FROM managertasks.user u JOIN managertasks.department d ON u.departmentUserId=d.id WHERE userComputer = '$ip'";
        return $this->get_users($query)[0];
    }

    function forgot_password($user_name) {
        $query = "SELECT * FROM managertasks.user WHERE userName='$user_name'";
        $users = $this->get_users($query);
        $date_now = date("Y-m-d H:i:s");
        $date_hour_next = date("Y-m-d H:i:s", strtotime('+1 hours'));
        if ($users) {
            $query = "INSERT INTO requestpassword(userName,dateCreate,dateExpirence) value('$user_name','$date_now' ,'$date_hour_next');";
            $result = db_access::run_non_query($query);
            if ($result->affected_rows > 0) {
                $insert_id = $result->insert_id;
                $email_to = $users[0]["email"];
                return $this->send_email_forgot_password($insert_id, $user_name, $email_to);
            }
        }
    }

    function send_email_forgot_password($request_id, $user_name, $email_to) {
        $subject = "change password";
        $body = "
              <html>
              <body>
              <h3>Dear $user_name,</h3><br>
              <h4><a href='http://localhost:4200/changePassword/$request_id'>link to change password</a></h4>
              <h4>Thank you!</h4>
              </body>
              </html>";
        return $this->send_email($email_to, 'taskManagementCompany@gmail.com', $subject, $body);
    }

    function hours_done_user_by_projects($user_id) {
        $query = "SELECT * FROM sumHoursForUserProject WHERE id=$user_id";
        return db_access::run_reader($query, function ($model) {
                    return $model;
                });
    }

    function get_users_by_department($department_name) {
        $query = "SELECT u.*,d.id as department_id,d.department FROM managertasks.user u JOIN managertasks.department d  ON u.departmentUserId=d.id WHERE d.department='$department_name'";
        return $this->get_users($query);
    }

    function update_user($params) {
        $query = "UPDATE managertasks.user SET userName='{$params['userName']}',departmentUserId={$params['departmentId']} ,managerId={$params['managerId']} ,email='{$params['email']}',numHourWork={$params['numHoursWork']}  WHERE id={$params['userId']} ";
        return db_access::run_non_query($query)->affected_rows;
    }

    function create_workers_report() {
        $query = "CALL `managertasks`.`report`('reportWorker');";
        $report_workers = $this->get_workers_report($query);
        foreach ($report_workers as $item) {
            $item['items'] = $this->worker_report_details($item['id']);
            $new_report_worker[] = $item;
        }
        return $new_report_worker;
    }

    function worker_report_details($worker_id) {

        $query = "CALL `managertasks`.`reportWorker`({$worker_id})";
        return $this->get_workers_details_report($query);
    }

    function change_password($requestId, $user) {
        $query = "select count(*) as result from requestpassword where idRequest={$requestId} and userName='{$user['userName']}' and  NOW()>dateCreate and NOW()<dateExpirence and isUse=false";
        $result = db_access::run_scalar($query);
        if ($result[0]) {
            $query = " UPDATE `managertasks`.`user`SET`password` = '{$user['password']}' WHERE `userName` = '{$user['userName']}'";
            return db_access::run_non_query($query)->affected_rows;
            $query = " UPDATE `managertasks`.`user`SET`password` = '{$user['password']}' WHERE `userName` = '{$user['userName']}'";
            return db_access::run_non_query($query)->affected_rows;
        }
    }

    function send_email_manager($user_id, $subject, $body) {
        $user = $this->get_user_details($user_id);
        $team_leader = $this->get_team_leader_user($user_id);
        return $this->send_email($team_leader['email'], $user['email'], $subject, $body);
    }

    function get_user_details($user_id) {
        $query = "SELECT * FROM managertasks.user JOIN managertasks.department ON user.departmentUserId=department.id WHERE user.id=$user_id";
        return $this->get_users($query)[0];
    }

    function get_team_leader_user($user_id) {
        $query = "SELECT uu.* FROM user u JOIN user uu ON u.managerId=uu.id WHERE u.id=$user_id";
        return $this->get_users($query)[0];
    }

}
