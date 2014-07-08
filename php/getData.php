<?php
    //$afspath = $_SERVER["AeroFSdir"];
    $afspath = "/mg/AeroFS/";
    //echo $afspath;
    $credsfile = $afspath . '.credentials/SQL/csaye';
    $file = file_get_contents($credsfile);
    //echo "hello";
    //echo "The host is: ";
    //echo $file[0];
    //echo $file;
    
    $creds = explode("\n", $file);
    //echo $creds[0];
    //echo "\n ";

    $host = $creds[0];
    $port = $creds[1];
    $username = $creds[2];
    $password = $creds[3];
    $database = $creds[4];

    /*
    echo "host is:";
    echo $host;
    echo "\n";
    echo "username is: ";
    echo $username;
    echo "\n";
    echo "password is: ";    
    echo $password;
    echo "\n";
    */  


    $server = mysql_connect($host, $username, $password);
    //echo $server;
    //echo "\n";
    $connection = mysql_select_db($database, $server);
    //echo $connection;
    //echo "\n";

    $myquery = "
    SELECT o.date_obs as date, v.mnvel as close FROM velocities v INNER JOIN observations o ON  o.observation_id=v.observation_id WHERE o.object='10700';
    ";
    /*
    $myquery = "
    SELECT  `date`, `close` FROM  `data2`
    ";
    */
    

    $query = mysql_query($myquery);
    
    if ( ! $query ) {
        echo mysql_error();
        die;
    }
    
    $data = array();
    
    for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $data[] = mysql_fetch_assoc($query);
    }
    
    echo json_encode($data);     
     
    mysql_close($server);
    //*/

?>