<?php

 require_once('session_start.php');

 date_default_timezone_set ('Europe/Paris');

 function answer2($reponse){
     $reponse['time'] = date('d/m/Y H:i:s');
     return json_encode($reponse);
 }

 function produceError2($message){
     echo answer2(['status'=>'error','message'=>$message]);
 }
 function produceResult2($result){
     echo answer2(['status'=>'ok','liste'=>$result]);
 }


 if (isset($_SESSION['ident']))
  return;
  else{
    produceError2('non authentifié ');
    exit() ;
  }

?>
