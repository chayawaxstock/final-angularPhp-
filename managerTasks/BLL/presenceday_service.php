<?php

class presenceday_service {

    function update_presenceday_worker($presence_day) {
        $date = date('Y-m-d H:i:s');

        $query = "select max(presentDayId) from presentday where id = '{$presence_day['userId']}' and projectId ='{$presence_day['projectId']}'";
   $resault= db_access::run_scalar($query)[0];

        $query = "UPDATE `managertasks`.`presentday`SET`timeEnd` = '{$date}' WHERE presentDayId = {$resault} and id ='{$presence_day['userId']}' and projectId = '{$presence_day['projectId']}'";
        return db_access::run_non_query($query)->affected_rows;
    }

    function add_present($pressantDay) {
        $date = date('Y-m-d H:i:s');
        $query = "INSERT INTO `managertasks`.`PresentDay`(`timeBegin`,`timeEnd`,`projectId`,`id`) VALUES('{$date}','{$date}',{$pressantDay['projectId']},{$pressantDay['userId']})";
        return db_access::run_non_query($query)->affected_rows;
    }

}
