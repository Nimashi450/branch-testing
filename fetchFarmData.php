<?php
   //include("config.php");
   $userid = $_SESSION['login_user'];

   $sqlfarm = "SELECT farm_name,farm_address,farmLongitude,farmLatitude,farmID FROM farm WHERE userID = '$userid'";
   $farmresult = mysqli_query($db,$sqlfarm);
 
   $_SESSION['farmName'] = array() ;
   $_SESSION['farmLocation'] = array() ;
   $_SESSION['farmLong'] = array() ;
   $_SESSION['farmLat'] = array() ;
   $_SESSION['farmid'] = array() ;


   while( $res = mysqli_fetch_assoc($farmresult) ) {
    // $_SESSION['farmName'] = $res['farm_name'] ;
    // $_SESSION['farmLocation'] = $res['farm_address'] ;
    // $_SESSION['farmLong'] = $res['farmLongitude'] ;
    // $_SESSION['farmLat'] = $res['farmLatitude'] ;
    //$_SESSION['farmid'] = $res['farmID'];

    array_push($_SESSION['farmName'] , $res['farm_name']);
    array_push($_SESSION['farmLocation'], $res['farm_address']);
    array_push($_SESSION['farmLong'], $res['farmLongitude']);
    array_push($_SESSION['farmLat'], $res['farmLatitude'] );
    array_push($_SESSION['farmid'], $res['farmID']);
    

}

?>