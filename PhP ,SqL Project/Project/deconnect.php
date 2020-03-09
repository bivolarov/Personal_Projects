<?php
require('lib/verify_session.php') ;

if(isset($_SESSION['ident'])){
  unset($_SESSION['ident']) ;
  session_destroy();
  echo '<div id="deconnect"> Vous etes deconnectes </div>' ;
  echo '<a href = "station_main.php" >  Accueil </a>' ;
}



?>
