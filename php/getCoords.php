<?php
    //$afspath = $_SERVER["AeroFSdir"];
    $mindate = $_GET['mindate'];
    $maxdate = $_GET['maxdate'];

    //echo gethostname();
    //echo get_current_user();
    $currentUser = get_current_user();

    if (gethostname() == 'aramis.astro.yale.edu') {
        $afspath = "/mg/AeroFS/";    
    } else {
        $afspath = "/Users/" . $currentUser . "/AeroFS/";
    }
    
    //  
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

    $myquery = "
    SELECT o.obs_ra_decdeg, o.obs_dec_decdeg FROM observations o WHERE o.date_obs>" . $mindate . " AND o.date_obs < " . $maxdate . " ORDER BY o.date_obs DESC;
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