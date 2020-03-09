<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../css/connect.css">
    <title>Carbadvisor Connect-Page</title>
  </head>
  <body>

    <ul>
<li><a href="../station_main.php">Accueil</a></li>
<li><a href="recherche.php">Rechercher une Station</a></li>
<li><a href="connect.php">Connectez-vous</a></li>
<li><a href="creation_compte.php">Créer une Compte</a></li>
</ul>


    <form method="POST" action="../services/login.php">
<div class="container">
  <label for="login"><b>Login</b></label>
  <input type="text" placeholder="Enter Username" name="login" required>

  <label for="psw"><b>Password</b></label>
  <input type="password" placeholder="Enter Password" name="psw" required>

  <button type="submit">Login</button>
</div>

  <p>Pas encore inscrit ? <a href="creation_compte.php">Créez un compte</a></p>
</form>



  </body>
</html>
