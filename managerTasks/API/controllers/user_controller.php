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

//        if (!empty( $this->validation_text($password, "", 64, 64, 'password')))
//            return  header("Status: 404 Not Found");
//       if (!empty($this->validation_text($user_name, "", 2, 15, 'userName')))
//            return  header("Status: 404 Not Found");
        return $this->user_service->login_by_password($params);
    }

    function login_by_ip($ip) {
        return $this->user_service->login_by_ip($ip);
    }

    function forgot_password($user_name) {
       // if ($this->validation_text($user_name, "", 2, 15, 'userName'))
            //return http_response_code(422);
        return $this->user_service->forgot_password($user_name);
    }

   
    function add_user($user) {

       // if ($this->validation_text($user['userName'], "", 2, 15, 'userName'))
         //   return http_response_code(422);
       // if ($this->validation_text($project['password'], "", 8, 16, 'password'))
           // return http_response_code(422);
       // if ($this->validation_int($project['numHoursWork'], 'numHourForProject', 6, 9))
         //   return http_response_code(422);
       // if ($this->validation_email($user['email'], 'email'))
          //  return http_response_code(422);
        return $this->user_service->add_user($user);
    }
    
    function delete_user($user_id){
       return $this->user_service->delete_user($user_id);
    }
                function hours_user_done_projects($user_id) {
        return $this->user_service->hours_done_user_by_projects($user_id);
    }

    function get_users_by_department($department_name) {
        return $this->user_service->get_users_by_department($department_name);
    }
    function  update_user($params)
    {
        return $this->user_service->update_user($params);
    }
    
    function create_workers_report()
    {
        return $this->user_service->create_workers_report();
    }
     function send_email_manager($user_id,$subject,$body)
    {
        return $this->user_service->send_email_manager($user_id,$subject,$body);
    }


    function change_password($requestId,$user){

        return$this->user_service->change_password($requestId,$user);
    }
    
    
}