<?php
include_once("config.php");

if(isset($_POST["export_data"])){
	$startDate = $_POST["startDate"];
	$endDate = $_POST["endDate"];
	$sensorNames = $_POST["sensor"];
    $sensor = implode(',',$_POST["sensor"]);
    $userid = $_SESSION['login_user'];

	$sql = "SELECT userID, datetime,$sensor FROM data_values WHERE userID = '$userid' and datetime between '$startDate' and '$endDate 23:59:59'"; 
	$result = mysqli_query($db,$sql);
	$developer_records = array();

	while( $rows = mysqli_fetch_assoc($result) ) {
		$developer_records[] = $rows;
	}
	
	header('Content-Type: text/csv; charset=utf-8');
	header('Content-Disposition: attachment; filename=Dataset.csv');
	$output = fopen('php://output', 'w');
	//$dataNames = array('DateTime');
	array_unshift($sensorNames,"UserID","DateTime");
	fputcsv($output, $sensorNames);

	if (count($developer_records) > 0) {
    foreach ($developer_records as $row) {
        fputcsv($output, $row);
    }
	}

exit;	


	
}	


// $sql = array();
// SELECT datetime,temp,hum,sTemp,sMois,sec,ph,n,p,k,r,b,si FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[0] = "SELECT userID,datetime,temp FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[1] = "SELECT userID,datetime,hum FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[2] = "SELECT userID,datetime,sTemp FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[3] = "SELECT userID,datetime,sMois FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[4] = "SELECT userID,datetime,sec FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[5] = "SELECT userID,datetime,ph FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[6] = "SELECT userID,datetime,n FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[7] = "SELECT userID,datetime,p FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[8] = "SELECT userID,datetime,k FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[9] = "SELECT userID,datetime,r FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[10] = "SELECT userID,datetime,b FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";
// $sql[11] = "SELECT userID,datetime,si FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";

// $developer_records = array();
// $result = array();
// for($i = 0; $i<12; $i ++){
// 	$result[$i] = mysqli_query($db, $sql[$i]);
// 	while( $rows[$i] = mysqli_fetch_assoc($result[$i]) ) {
// 		$developer_records[$i][] = $rows[$i];
//    }
// }

// if(isset($_POST["export_data0"])) {	
// 	$filename = "Temperature_dataset". ".xls";			
// 	header("Content-Type: application/vnd.ms-excel");
// 	header("Content-Disposition: attachment; filename=\"$filename\"");	
// 	header("Content-Type: application/csv;");
// 	$show_coloumn = false;
// 	if(!empty($developer_records[0])) {
// 	  	foreach($developer_records[0] as $record[0]) {
// 			if(!$show_coloumn) {
// 		  		// display field/column names in first row
// 			echo implode("\t", array_keys($record[0])) . "\n";
// 		  	$show_coloumn = true;
// 			}
// 		echo implode("\t", array_values($record[0])) . "\n";
// 	  	}
// 	}
// exit; 

// }	

// // Export Humidity data

// if(isset($_POST["export_data1"])) {	
// 	$filename = "humidity_dataset". ".xls";			
// 	header("Content-Type: application/vnd.ms-excel");
// 	header("Content-Disposition: attachment; filename=\"$filename\"");	
// 	header("Content-Type: application/csv;");
// 	$show_coloumn = false;
// 	if(!empty($developer_records[1])) {
// 		  foreach($developer_records[1] as $record[1]) {
// 			if(!$show_coloumn) {
// 			  // display field/column names in first row
// 			echo implode("\t", array_keys($record[1])) . "\n";
// 			  $show_coloumn = true;
// 		}
// 		echo implode("\t", array_values($record[1])) . "\n";
// 	  }
// }
// exit; 

// }

// // Export Soil temp data

// if(isset($_POST["export_data2"])) {	
// 	$filename = "Soiltemp_dataset". ".xls";			
// 	header("Content-Type: application/vnd.ms-excel");
// 	header("Content-Disposition: attachment; filename=\"$filename\"");	
// 	header("Content-Type: application/csv;");
// 	$show_coloumn = false;
// 	if(!empty($developer_records[2])) {
// 		  foreach($developer_records[2] as $record[2]) {
// 			if(!$show_coloumn) {
// 			  // display field/column names in first row
// 			echo implode("\t", array_keys($record[2])) . "\n";
// 			  $show_coloumn = true;
// 		}
// 		echo implode("\t", array_values($record[2])) . "\n";
// 	  }
// }
// exit; 

// }
 ?>