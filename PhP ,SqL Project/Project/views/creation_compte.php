

<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Creation Compte</title>
    <link rel="stylesheet" href="../css/creation_compte.css">

  </head>
  <body>


    <ul>
<li><a href="../station_main.php">Accueil</a></li>
<li><a href="recherche.php">Rechercher une Station</a></li>
<li><a href="connect.php">Connectez-vous</a></li>
<li><a href="creation_compte.php">Créer une Compte</a></li>
</ul>


    <form method="POST" action="../create_user.php">
     <fieldset>
       <label for="nom">Nom :</label>
       <input type="text" name="nom" id="nom" required="required" autofocus/>
       <label for="prenom">Prénom :</label>
       <input type="text" name="prenom" id="prenom" required="required" autofocus/>
       <label for="login">Login :</label>
       <input type="text" name="login" id="login" required="required" autofocus/>
      <label for="password">Mot de passe :</label>
      <input type="password" name="password" id="password" required="required" />
      <button type="submit" name="valid">Creer Votre Compte</button>
     </fieldset>
    </form>





    </body>
    </html>
