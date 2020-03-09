<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Carbadvisor</title>
    <link rel="stylesheet" href="css/menu.css">

    <link rel="stylesheet" href="css/carteAccueil.css">
    <link href='http://fonts.googleapis.com/css?family=Gudea' rel='stylesheet' type='text/css' />
    <link href='http://fonts.googleapis.com/css?family=Ubuntu+Mono&amp;subset=latin,latin-ext' rel='stylesheet' type='text/css' />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
   integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
   crossorigin=""></script>



  </head>
  <body>

          <ul>
      <li><a href="station_main.php">Accueil</a></li>
      <li><a href="views/recherche.php">Rechercher une Station</a></li>
      <li><a href="views/connect.php">Connectez-vous</a></li>
      <li><a href="views/creation_compte.php">Créer une Compte</a></li>
      </ul>



      <h1 id="titre">Liste des 10 stations ayant la Meilleur Note Globale</h1>

        <div id="cartecampus"></div> <br>

      <?php

       $best = file_get_contents('http://webtp.fil.univ-lille1.fr/~bivolarov/PROJET2/services/findBestStations.php') ;
       $best = json_decode($best , true) ;

       foreach ($best['result'] as $key) {
         foreach ($key as $k => $value) {
           if($k == "id"){
             $tr = $tr . "<tr data-id=" . '"' . "$value" . '"'   ;
             $info_base = file_get_contents('http://webtp.fil.univ-lille1.fr/~clerbout/carburant/infoStation.php?id='. $value) ;
             $info_json = json_decode($info_base , true) ;
             $idcarburant = "" ;
             $libellecarburant = "" ;
             $price = "" ;
             foreach ($info_json["data"]["prix"] as $key_prix) {
               foreach ($key_prix as $key_info => $value_info) {
                    if($key_info == "idcarburant"){
                      $idcarburant .=  $value_info  . " , "  ;
                    }
                    elseif($key_info == "libellecarburant"){
                      $libellecarburant .=  $value_info . " , "  ;
                    }
                    elseif($key_info == "valeur"){
                      $price .= $value_info . " , "  ;
                    }

               }
             }
             $idcarburant = rtrim($idcarburant , " , ") ;
             $libellecarburant = rtrim($libellecarburant , " , ") ;
             $price = rtrim($price , " , ") ;
             $tr = $tr .  " data-idcarburant='" . $idcarburant . "'" . " data-libellecarburant='" . $libellecarburant . "'" . " data-prix='" . $price . "'" ;

             $services = "" ;
             if(is_array($info_json["data"]["services"])){
             foreach ($info_json["data"]["services"] as $key_service) {
               $services .= $key_service . " , " ;
             }
           }
            $services = str_replace("'" , " " , $services) ;
             $services = rtrim($services , " , ") ;
             $tr .= " data-services='" . $services . "'" ;

             require_once("lib/db_parms.php") ;
             require_once("lib/DataLayer.class.php") ;
             $data = new DataLayer() ;
             $value = str_replace('"', "'", $value);
             $add_info = $data->getAdditionalInfo($value) ;
            if($add_info != FALSE && is_array($add_info)){
               foreach ($add_info as $key_add => $value_add) {
                 foreach ($value_add as $key_a => $value_a) {

                   if($key_a== "nom"){
                     if($value_a == null){
                       $tr = $tr . " data-nom='No Name'";
                     }
                     else{
                       $tr = $tr . " data-nom=" . '"' . "$value_a" . '"' ;
                     }
                   }
                   if($key_a == "marque"){
                       $tr = $tr . " data-marque=" . '"' . "$value_a" . '"' ;
                     }

                     if($key_a == "cp"){
                       $tr = $tr . " data-cp=" . '"' . "$value_a" . '"' ;
                     }
                     if($key_a == "adresse"){
                       $tr = $tr . " data-adresse=" . '"' . "$value_a" . '"' ;
                     }
                     if($key_a == "ville"){
                       $tr = $tr . " data-ville=" . '"' . "$value_a" . '"' ;
                   }
                 }

               }

             }
        }



           if($k == "latitude"){
               $tr = $tr . " data-lat=" . '"' . "$value"  . '"'  ;
             }
             if($k == "longitude"){
               $tr = $tr . " data-lon=" . '"' . "$value" . '"' ;
             }
             if($k == 'noteglobale'){
               $tr = $tr . " data-noteglobale=" . '"' . "$value"  . '"'  ;
             }
             if($k == 'noteaccueil'){
               $tr = $tr . " data-noteaccueil=" . '"' . "$value"  . '"'  ;
             }
             if($k == 'noteprix'){
               $tr = $tr . " data-noteprix=" . '"' . "$value"  . '"'  ;
             }
             if($k == 'noteservice'){
               $tr = $tr . " data-noteservice=" . '"' . "$value"  . '"'  . "</tr>" ;
             }

        }
      }

      echo  "<table id='communes'> <thead> <tr> <th> </th></tr> </thead> <tbody> " . $tr . "</tbody> </table>" ;


       ?>
       <div class="information" id ="infos">
        </div>
        <!--
       <div id = "ville"></div>
       <div id = "cp"></div>
       <div id = "nom"></div>
       <div id = "adresse"></div>
       <div id = "marque"></div>
       <div id = "carburants"></div>
       <div id = "prix"></div>
       <div id = "services"></div>
       -->
       <br>

       <div class="info_avis" id ="avis">
       </div>
       <!--
       <div id = "note_globale"></div>
       <div id = "note_accueil"></div>
       <div id = "note_prix"></div>
       <div id = "note_service"></div>
       <br>
       -->
       <br>

       <div class="post" id="posts">
       </div>
       <div class="all_posts" id="all_posts">
       </div>


       <div class="information" id ="first">  </div> <br>
       <div id="premiere"> Premiere Station
       <div id = "ville_first"></div>
       <div id = "cp_first"></div>
       <div id = "nom_first"></div>
       <div id = "adresse_first"></div>
       <div id = "marque_first"></div>
       <div id = "carburants_first"></div>
       <div id = "prix_first"></div>
       <div id = "services_first"></div>
       </div>
       <br>
       <br>

       <div class="information" id ="second"></div><br>
       <div id="deuxieme"> Deuxieme Station
       <div id = "ville_second"></div>
       <div id = "cp_second"></div>
       <div id = "nom_second"></div>
       <div id = "adresse_second"></div>
       <div id = "marque_second"></div>
       <div id = "carburants_second"></div>
       <div id = "prix_second"></div>
       <div id = "services_second"></div>
       </div>
       <br>
       <br>

       <div class="information" id ="three"></div><br>
       <div id="troisieme"> Troisieme Station
       <div id = "ville_three"></div>
       <div id = "cp_three"></div>
       <div id = "nom_three"></div>
       <div id = "adresse_three"></div>
       <div id = "marque_three"></div>
       <div id = "carburants_three"></div>
       <div id = "prix_three"></div>
       <div id = "services_three"></div>
       </div>
       <br>
       <br>

       <div class="information" id ="four"></div><br>
       <div id="quatrieme"> Quatrieme Station
       <div id = "ville_four"></div>
       <div id = "cp_four"></div>
       <div id = "nom_four"></div>
       <div id = "adresse_four"></div>
       <div id = "marque_four"></div>
       <div id = "carburants_four"></div>
       <div id = "prix_four"></div>
       <div id = "services_four"></div>
       </div>
       <br>
       <br>

       <div class="information" id ="five"> </div><br>
       <div id="cinquieme">Cinqieme Station
       <div id = "ville_five"></div>
       <div id = "cp_five"></div>
       <div id = "nom_five"></div>
       <div id = "adresse_five"></div>
       <div id = "marque_five"></div>
       <div id = "carburants_five"></div>
       <div id = "prix_five"></div>
       <div id = "services_five"></div>
       </div>
       <br>
       <br>

       <div class="information" id ="six"> </div><br>
       <div id="sixieme"> Sixieme Station
       <div id = "ville_six"></div>
       <div id = "cp_six"></div>
       <div id = "nom_six"></div>
       <div id = "adresse_six"></div>
       <div id = "marque_six"></div>
       <div id = "carburants_six"></div>
       <div id = "prix_six"></div>
       <div id = "services_six"></div>
       </div>
       <br>
       <br>

       <div class="information" id ="seven"> </div><br>
       <div id="septieme"> Septieme Station
       <div id = "ville_seven"></div>
       <div id = "cp_seven"></div>
       <div id = "nom_seven"></div>
       <div id = "adresse_seven"></div>
       <div id = "marque_seven"></div>
       <div id = "carburants_seven"></div>
       <div id = "prix_seven"></div>
       <div id = "services_seven"></div>
       </div>
       <br>
       <br>

       <div class="information" id ="eight"> </div><br>
       <div id="huitieme"> Huitieme Station
       <div id = "ville_eight"></div>
       <div id = "cp_eight"></div>
       <div id = "nom_eight"></div>
       <div id = "adresse_eight"></div>
       <div id = "marque_eight"></div>
       <div id = "carburants_eight"></div>
       <div id = "prix_eight"></div>
       <div id = "services_eight"></div>
       </div>
       <br>
       <br>

       <div class="information" id ="nine"> </div><br>
       <div id="neuvieme">Neuvième Station
       <div id = "ville_nine"></div>
       <div id = "cp_nine"></div>
       <div id = "nom_nine"></div>
       <div id = "adresse_nine"></div>
       <div id = "marque_nine"></div>
       <div id = "carburants_nine"></div>
       <div id = "prix_nine"></div>
       <div id = "services_nine"></div>
       </div>
       <br>
       <br>

       <div class="information" id ="ten"> </div><br>
       <div id="dixieme"> Dixieme Station
       <div id = "ville_ten"></div>
       <div id = "cp_ten"></div>
       <div id = "nom_ten"></div>
       <div id = "adresse_ten"></div>
       <div id = "marque_ten"></div>
       <div id = "carburants_ten"></div>
       <div id = "prix_ten"></div>
       <div id = "services_ten"></div>
       </div>
       <br>
       <br>











  <script type="text/javascript" src = "javascript/mainpageScript.js"> </script>


  </body>
  <div class="footer">
    <div id="slot_1"></div>
    <div id="slot_2">
      <footer>
              <small id = "copyright">&copy; Copyright 2018-2019 , BIVOLAROV STOYAN / FERNANDES ANTOINE : Université Lille 1  </small>
      </footer>

</div>
    <div id="slot_3"></div>
  </div>


</html>
