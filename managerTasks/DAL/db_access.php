<?php

class db_access {

    static function run_reader($query, $init_model) {

        global $connection;
       self::clearStoredResults();
        $resultObj = $connection->query($query);
       
        /* create one master array of the records */
        $list = array();

        while ($singleRowFromQuery = $resultObj->fetch_array(MYSQLI_ASSOC)) {
            $list[] = $init_model($singleRowFromQuery);
        }
         $resultObj->close();
        return $list;

    }

    static function run_scalar($query) {
        global $connection;
        $resultObj = $connection->query($query);
        return array_values(get_object_vars($resultObj->fetch_object()));
   
    }
    
    
   static function run_non_query($query) {
        global $connection;
        $resultObj = $connection->query($query);
        return $connection;
    } 

    static function clearStoredResults(){
    global $connection;

    do {
         if ($res = $connection->store_result()) {
           $res->free();
         }
        } while ($connection->more_results() && $connection->next_result());        
}

}
