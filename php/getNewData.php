<?php
    //$afspath = $_SERVER["AeroFSdir"];
    $pltpar = $_GET['param'];
    $sqltblnm = $_GET['tablenm'];

    $afspath = "/mg/AeroFS/";
    //  $afspath = "/Users/matt/AeroFS/";
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

    $whereclause = 'WHERE ';

    if (isset($_GET['objectnm'])){
        $objectnm = $_GET['objectnm'];
        $whereclause += 'o.object = ' . $objectnm;
    }

    if ($sqltblnm =='observations') {
        $myquery = "
    SELECT o.date_obs as date, o." . $pltpar . " as ydata, o.obnm as obnm, o.object as objectnm, sqrt(v.cts) as snr, o.exptime as exptime, o.zd as zd FROM velocities v INNER JOIN observations o ON  o.observation_id=v.observation_id WHERE o.object='" . $objectnm . "' AND o.date_obs != 'date-obs' AND v.mnvel IS NOT NULL ORDER BY o.date_obs DESC;
    ";   
    }

    if ($sqltblnm =='velocities') {
        $myquery = "
    SELECT o.date_obs as date, v." . $pltpar . " as ydata, o.obnm as obnm, o.object as objectnm, sqrt(v.cts) as snr, o.exptime as exptime, o.zd as zd FROM velocities v INNER JOIN observations o ON  o.observation_id=v.observation_id WHERE o.object='" . $objectnm . "' AND o.date_obs != 'date-obs' AND v.mnvel IS NOT NULL ORDER BY o.date_obs ASC;
    ";   
    }
    
    if (($sqltblnm !='observations') and ($sqltblnm !='velocities')) {
        $myquery = "
        SELECT o.date_obs as date, ". $sqltblnm . "." . $pltpar . " as ydata, o.obnm as obnm, o.object as objectnm FROM observations o INNER JOIN " . $sqltblnm . " ON " . $sqltblnm.  ".observation_id=o.observation_id WHERE o.object='" . $objectnm . "' AND ". $sqltblnm . "." . $pltpar . " IS NOT NULL AND o.date_obs != 'date-obs' ORDER BY o.date_obs DESC;";   
    }

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