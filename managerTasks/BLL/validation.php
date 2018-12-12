<?php

class validation {

    function validation_text($text, $pattern, $min_length, $max_length, $name) {

        $msg_name = '';
        if (empty($text)) {
            $msg_name = "" . $name . "is required";
            return $msg_name;
        }
        if ($pattern) {
            preg_match(pattern, $text, $name_matches);
            if (!$name_matches[0])
                $msg_name = "text is not match patten";
        }
        $len = strlen($text);
        if ($len < $min_length) {
            $msg_name = "$name is too short, minimum is $min_length characters ($max_length max)";
        } elseif ($len > $max_length) {
           $msg_name = "$name is too long, maximum is $max_length characters ($min_length min).";
        }
        return $msg_name;
    }

    function validation_date($date, $name) {
        $msg_name = '';
        if (empty($date)) {
            $msg_name = $name . "is required";
            return $msg_name;
        }
        $today = strtotime("now");
        if (strtotime($date) < $today)
            $msg_name = $name . "is before now day";
        return $msg_name;
    }

    function validation_int($number, $name, $min, $max) {

        $msg_name = '';
        if (empty($number)) {
            $msg_name = $name . "is required";
            return $msg_name;
        }
        $options = array(
            'options' => array(
                'min_range' => $min,
                'max_range' => $max,
            )
        );

        if (filter_var($number, FILTER_VALIDATE_INT, $options) == FALSE) {
            $msg_name = $name . "is not between '$min'-'$max'";
        }
        return $msg_name;
    }

    function validation_email($email, $name) {
        $msg_name = '';
        if (filter_var($email_a, FILTER_VALIDATE_EMAIL))
            $msg_name = $name . " Invalid format";
        return $msg_name;
    }

}
