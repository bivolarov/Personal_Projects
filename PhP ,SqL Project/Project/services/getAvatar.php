<?php

spl_autoload_register(function ($className) {
   include ("../lib/{$className}.class.php");
});
require_once ('../lib/initDataLayer.php');

$args = new RequestParameters();
$args->defineNonEmptyString('pseudo') ;

if ($args->isValid()) {
 $res = $data->getAvatar($args->pseudo) ;
 if ($res) {
   echo '<img src="data:'.$res['mimetype'].';base64,'.base64_encode($res['avatar']).'" alt="avatar_image" />';
 }
 else {
   $resultat = ['status'=>'error' , 'message'=>'no image' , 'result'=> null]  ;
   $encodage = json_encode($resultat);
   return $encodage;
 }

}
else{
 echo "Paramètre incorrect. " . $args->getErrorMessages();
}


?>
