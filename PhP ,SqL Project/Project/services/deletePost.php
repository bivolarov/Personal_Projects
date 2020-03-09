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

$args = new RequestParameters('post');
$args->defineInt('id_post') ;
try{
      require("../lib/initDataLayer.php") ;
      $res = $data->deletePost($args->id_post) ;
      if($res){
        header("Location: ../postes.php") ;
        //produceResult($res) ;
      }
      else{
        produceError("cannot delete post");
      }

} catch (PDOException $e){
    produceError($e->getMessage());
}


 ?>
