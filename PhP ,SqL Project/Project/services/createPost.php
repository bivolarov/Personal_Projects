<?php

require('../lib/verify_session.php') ;

spl_autoload_register(function ($className) {
    include ("../lib/{$className}.class.php");
});
date_default_timezone_set ('Europe/Paris');

set_include_path('..');




function answer($reponse){
    global $args;
    $reponse['args'] = $args->getValues();
    $reponse['time'] = date('d/m/Y H:i:s') ;
    return json_encode($reponse);
}

function produceError($message){
    echo answer(['status'=>'error','message'=>$message]);
}
function produceResult($result){
    echo answer(['status'=>'ok','result'=>$result]);
}

$args = new RequestParameters();
$args->defineNonEmptyString('id_station') ;
$args->defineNonEmptyString('title') ;
$args->defineNonEmptyString('comments') ;


try{
      require("../lib/initDataLayer.php") ;
      $res = $data->createPost($_SESSION['ident'] , $args->id_station , $args->title , $args->comments) ;
      if($res){
        //produceResult($data->getId($args->station)) ;
        header('Location: ../views/main_page_2.php');
      }
      else{
        produceError("cannot create post");
      }

} catch (PDOException $e){
    produceError($e->getMessage());
}


 ?>
