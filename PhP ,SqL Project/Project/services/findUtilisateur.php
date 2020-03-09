<?php

spl_autoload_register(function ($className) {
    include ("../lib/{$className}.class.php");
});
date_default_timezone_set ('Europe/Paris');

set_include_path('..');

header('Content-type: application/json; charset=UTF-8');



function answer($reponse){
    global $args;
    $reponse['args'] = $args->getValues();
    $reponse['time'] = date('d/m/Y H:i:s');
    return json_encode($reponse);
}

function produceError($message){
    echo answer(['status'=>'error','message'=>$message]);
}
function produceResult($result){
    echo answer(['status'=>'ok','result'=>$result]);
}


$args = new RequestParameters();
$args->defineNonEmptyString('login') ;

try{
    if($args->isValid()) {
      require("../lib/initDataLayer.php") ;
      $find_user = $data->getInfoUser($args->login);
      if($find_user){
        produceResult($find_user);
      }
      else{
        produceError("user not found");
      }
    }
    else{
      produceError("Argument Invalid") ;
    }


} catch (PDOException $e){
    produceError($e->getMessage());
}


 ?>
