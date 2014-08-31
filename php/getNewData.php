<?php
    //$afspath = $_SERVER["AeroFSdir"];
    $pltpar = $_GET['param'];
    //$afspath = "/mg/AeroFS/";
    $afspath = "/Users/matt/AeroFS/";
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

    
    $server = mysql_connect($host, $username, $password);
    //echo $server;
    //echo "\n";
    $connection = mysql_select_db($database, $server);
    //echo $connection;
    //echo "\n";

    $myquery = "
    SELECT o.date_obs as date, v." . $pltpar . " as close FROM velocities v INNER JOIN observations o ON  o.observation_id=v.observation_id WHERE o.object='10700' AND v.mnvel IS NOT NULL;
    ";   

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