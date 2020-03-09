<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>PROFIL USER</title>
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
        echo "<h1 id='login'> Le profil de : " . $_SESSION['ident']  . "</h1>";

        echo "<div>Les informations concernants ce profil :</div>" ;
        echo "<br>" ;
        echo "<br>"  ;

        $info = file_get_contents("http://webtp.fil.univ-lille1.fr/~bivolarov/PROJET2/services/findUtilisateur.php?login=" . $_SESSION['ident']) ;
        $info = json_decode($info , true) ;

        $div_info = "<div id='info_user'>" ;

        foreach ($info['result'] as $key => $value) {
              if($key == "login"){
                $div_info .= '<div id="login">' . "Login : ". $value . '</div>' ;
              }
              if($key == "nom"){
                $div_info .= '<div id="nom">' ."Nom : " .  $value . '</div>' ;
              }
              if($key == "prenom"){
                $div_info .= '<div id="prenom">' . "Prenom : ". $value . '</div>' ;
              }
              if($key == "mail"){
                $div_info .= '<div id="mail">' . "Mail : ". $value . '</div>' ;
              }
              if($key == "ville"){
                $div_info .= '<div id="ville">' ."Ville : ". $value . '</div>' ;
              }
              if($key == "description"){
                $div_info .= '<div id="description">' . "Description :  " .$value . '</div>' ;
              }

        }
        echo $div_info . '</div>' ;


       ?>
      <br>
      <br>


       <form class="update" id="update" action="services/updateProfil.php" method="post">
         <fieldset>
             <legend>Mise à jour de votre profil : </legend>
                         <label id="password" for="password"> Password : <br></label> <input type="text" name="password"><br>
                         <label id="mail" for="mail"> Mail : <br></label> <input type="text" name="mail"><br>
                        <label id="description" for="description"> Description : <br></label> <input type="text" name="description"><br>
                        <label id="ville" for="ville"> Ville : <br></label> <input type="text" name="ville"><br>
                        <br>
                        <button class="submit" >Modifier</button>
              </fieldset>
       </form>



  </body>
</html>
