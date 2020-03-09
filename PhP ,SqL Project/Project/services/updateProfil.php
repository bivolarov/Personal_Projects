<?php
require("../lib/verify_session.php") ;

spl_autoload_register(function ($className) {
    include ("../lib/{$className}.class.php");
});
date_default_timezone_set ('Europe/Paris');

set_include_path('..');




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


$args = new RequestParameters('post');
$args->defineString('mail') ;
$args->defineString('description') ;
$args->defineString('ville') ;
$args->defineString('password') ;


try{
    if($args->isValid()) {
      require("../lib/initDataLayer.php") ;
      $create = $data->updateProfil($_SESSION['ident'] , $args->mail , $args->description , $args->ville , $args->password) ;
      if($create){
        header('Location: ../profil.php') ;
        //$update = $data->getUpdatedProfil($_SESSION['ident']) ;
        //produceResult($update);
      }
      else{
        produceError("user cannot be updated");
      }
    }
    else{
      produceError("Argument Invalid") ;
    }


} catch (PDOException $e){
    produceError($e->getMessage());
}


 ?>
