<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Mes Postes</title>
  </head>
  <body>

    <title>Carbadvisor Connect-Page</title>
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/carteAccueil.css">
  </head>
  <body>

    <ul>
  <li><a href="views/main_page_2.php">Accueil</a></li>
  <li><a href="recherche.php">Rechercher une Station</a></li>
  <li><a href="postes.php">Mes Postes</a></li>
  <li><a href="profil.php">Mon Profil</a></li>
  <li><a href="deconnect.php">Deconnexion</a></li>
  </ul>

 <?php
 $posts = file_get_contents("http://webtp.fil.univ-lille1.fr/~bivolarov/PROJET2/services/findMesPosts.php?login=" . $_SESSION['ident']) ;
 $posts = json_decode($posts , true) ;

 if($posts['status'] != "ok"){
   echo "<h1> Pas de posts disponible pour l'utilisateur : " . $_SESSION['ident']  . "</h1>";
 }
 else{
    echo "<h1> Les Posts de : " . $_SESSION['ident']  . "</h1>";



    $posts['liste'] = array_reverse($posts['liste']) ;
    foreach ($posts['liste'] as $key) {
      $form = "<form class='posts' action='services/deletePost.php' method='post'><fieldset>" ;
      $input = "Identifiant du post : <br> <input type='text' name='id_post' value=" ;
      $p = "<p>" ;
      $legend = "<legend>" ;
      foreach ($key as $k => $v) {

        if($k == "id"){
          $input .= $v ."> <br>" ;
        }
        if($k == "auteur"){
          $p .= " Auteur : " . $v ."<br>" ;
        }
        if($k == "station"){
          $p .= " Station Id : " . $v ."<br>";
        }
        if($k =="titre") {
            $p .= " Titre : " . $v ."<br>" ;
        }
        if($k == "contenu"){
          $p .= " Vous avez dit : " . $v . "</p>" ."<br>";
        }

        if($k=="datecreation"){
            $legend = $legend . " Poste le " .  $v . "</legend>" ;
        }
    }
    $form .= $legend . $input . $p . "<button type='submit'>Delete Post</button><br>" ;
    echo $form . "</fieldset></form>" ;
    }

 }






  ?>





  </body>
</html>
