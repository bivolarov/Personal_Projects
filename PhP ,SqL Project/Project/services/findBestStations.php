 <?php

 spl_autoload_register(function ($className) {
     include ("../lib/{$className}.class.php");
 });
 date_default_timezone_set ('Europe/Paris');

 set_include_path('..');

 header('Content-type: application/json; charset=UTF-8');


 function answer($reponse){
     global $args;
     $reponse['args'] = 0 ;
     $reponse['time'] = date('d/m/Y H:i:s');
     return json_encode($reponse);
 }

 function produceError($message){
     echo answer(['status'=>'error','message'=>$message]);
 }
 function produceResult($result){
     echo answer(['status'=>'ok','result'=>$result]);
 }


 try{
       require("../lib/initDataLayer.php") ;
       $res = $data->findBestStations();
       if($res){
         $res_reversed = array_reverse($res) ;
         $res_10 = array_slice($res_reversed , 0 , 10) ;
         produceResult($res_10);
       }
       else{
         produceError("station  not found");
       }

 } catch (PDOException $e){
     produceError($e->getMessage());
 }


  ?>
