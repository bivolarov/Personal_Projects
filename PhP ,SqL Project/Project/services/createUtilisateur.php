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
$args->defineNonEmptyString('password') ;
$args->defineNonEmptyString('nom') ;
$args->defineNonEmptyString('prenom') ;



try{
    if($args->isValid()) {
      require("../lib/initDataLayer.php") ;
      $create = $data->createUser($args->login , $args->password , $args->nom , $args->prenom);
      if($create){
        produceResult($create['args']['pseudo']);
      }
      else{
        produceError("user cannot be created");
      }
    }
    else{
      produceError("Argument Invalid") ;
    }


} catch (PDOException $e){
    produceError($e->getMessage());
}


 ?>
