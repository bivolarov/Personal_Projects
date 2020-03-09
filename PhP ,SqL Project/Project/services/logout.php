<?php

date_default_timezone_set ('Europe/Paris');

header('Content-type: application/json; charset=UTF-8');

function answer($reponse){
    $reponse['time'] = date('d/m/Y H:i:s');
    return json_encode($reponse);
}

function produceError($message){
    echo answer(['status'=>'error','message'=>$message]);
}
function produceResult($result){
    echo answer(['status'=>'ok','result'=>$result]);
}

    set_include_path('..'.PATH_SEPARATOR);
    require('lib/verify_session.php');
    $login = $_SESSION['ident'];
    session_destroy();
    produceResult($login);

?>
