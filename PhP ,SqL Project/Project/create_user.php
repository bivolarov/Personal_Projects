<?php


$login = $_POST["login"] ;
$password = $_POST["password"] ;
$nom = $_POST["nom"] ;
$prenom = $_POST["prenom"] ;



$create = file_get_contents('http://webtp.fil.univ-lille1.fr/~bivolarov/PROJET2/services/createUtilisateur.php?login=' . $login . '&password=' . $password . '&nom=' . $nom .'&prenom=' . $prenom) ;
$create = json_decode($create , true) ;

if($create['status'] == 'ok'){
  require("views/pageCreateOK.php") ;
}

else{
  require("views/creation_compte.php") ;
}

?>
