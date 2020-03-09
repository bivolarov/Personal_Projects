 <?php

 set_include_path('..'.PATH_SEPARATOR);


 require_once('lib/session_start.php');

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



 if ( ! isset($_SESSION['ident'])) {
   $args = new RequestParameters();
   $args->defineNonEmptyString('login');
   $log = $args->login ;
   $args->defineNonEmptyString('psw');

   if (! $args->isValid()){
    produceError('argument(s) invalide(s) --> '.implode(', ',$args->getErrorMessages()));
    return;
   }

     require("../lib/initDataLayer.php") ;
     $person = $data->authentifier($log, $args->psw);
     if($person){
       $_SESSION['ident'] = $log ;
       header('Location: ../views/main_page_2.php');

     } else {
       header('Location: ../views/connect.php') ;
        //produceError("login incorrect");
      }
   }
  else {
        produceError("déjà authentifié");
        return;
     }


 ?>
