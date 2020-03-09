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
$args->defineNonEmptyString('id') ;

try{
    if($args->isValid()) {
      require("../lib/initDataLayer.php") ;
      $find_station = $data->findStation($args->id);
      if($find_station){
        produceResult($find_station);
      }
      else{
        produceError("station not found");
      }
    }
    else{
      produceError("Argument Invalid") ;
    }


} catch (PDOException $e){
    produceError($e->getMessage());
}


 ?>
