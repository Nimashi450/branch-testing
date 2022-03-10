<?php
   define('DB_SERVER', 'localhost');
   define('DB_USERNAME', 'root');
   define('DB_PASSWORD', '');
   // define('DB_USERNAME', 'slt');
   // define('DB_PASSWORD', '179189Th#');
   define('DB_DATABASE', 'smart_agro');

   // define('DB_SERVER', '222.165.186.100');
   // define('DB_USERNAME', 'agrouser');
   // define('DB_PASSWORD', 'hsfDi9g8T*&');
   // define('DB_DATABASE', 'smart_agro');

   $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

   if(!$db){
      die('Could not Connect My Sql:' .mysql_error());
   }
?> 