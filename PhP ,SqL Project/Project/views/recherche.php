<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Carbadvisor</title>
    <link rel="stylesheet" href="../css/carteCarbu.css">
    <link rel="stylesheet" href="../css/checkbox.css">
    <link rel="stylesheet" href="../css/menu.css">
    <script type="text/javascript" src = "../javascript/scriptCarte.js"> </script>
    <script type="text/javascript" src="../javascript/checkBox.js" > </script>
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
<li><a href="../station_main.php">Accueil</a></li>
<li><a href="recherche.php">Rechercher une Station</a></li>
<li><a href="connect.php">Connectez-vous</a></li>
<li><a href="creation_compte.php">Créer une Compte</a></li>
</ul>


    <h1> Votre recherche de stations à proximité </h1>


<form action="recherche.php" method="get" id='rech'>
      <fieldset>
          <legend>OÙ TROUVER UNE STATION ? </legend>
               <label id="com" for="commune"> COMMUNE : <br></label>  <input type="text" id="commune" name="commune" size="20" maxlength="100" required="required" placeholder="Entrer un lieu" /> <br>
               <br>
               <label id="ray" for="rayon"> RAYON : <br></label> <input type="text" id="rayon" name="rayon" size="15" maxlength="100" pattern="[0-9]|[0-9]{2}|[0-9]{3}" placeholder="Entrer un rayon"/> <br>
               <br>
               <div class="carburants" >
                                 <div class="selectBox" onclick="showCheckboxes()">
                                   <select>
                                     <option>Choisir un Carburant : </option> <br>
                                   </select>
                                   <div class="overSelect"></div>
                                  </div>
                                  <div id="checkboxes" >
                                    <label for="one">
                                      <input type="checkbox" name="carburant[]" id="carburant" value = "1"/>Gazole</label>
                                      <label for="two">
                                        <input type="checkbox" name="carburant[]" id="carburant" value = "2" />SP95</label>
                                        <label for="three">
                                          <input type="checkbox" name="carburant[]" id="carburant" value = "3" />E85</label>
                                          <label for="four">
                                            <input type="checkbox" name="carburant[]" id="carburant" value = "4" />GPLc</label>
                                            <label for="five">
                                              <input type="checkbox" name="carburant[]" id="carburant" value = "5" />E10</label>
                                              <label for="six">
                                                <input type="checkbox" name="carburant[]" id="carburant"  value = "6" />SP98</label>
                                        </div>
                </div>
                <br>
                <button onclick = "buttoncClick()" class="recherche" >Rechercher</button>
      </fieldset>
   </form>
   <br>
   <br>

   <div id="cartecampus"></div> <br>


   <?php

   $commune = $_GET['commune'] ;
   $rayon = $_GET['rayon'] ;
   $carburant = $_GET['carburant'] ;
   $c = "" ;

   //rayon conditions

   if($rayon === ""){
     $rayon = 1 ;
   }

   //carburants conditions
   if(isset($carburant)) {
       foreach($carburant as $carbo){
           if(in_array($carbo , $carburant)){
                 $c = $c . $carbo . ','  ;
     }
   }
   }


   if($c == "1," || $c == "2," || $c == "3," || $c == "4," || $c == "5," || $c == "6,"){
     $c = rtrim($c , ',') ;
   }
   else{
     $c = rtrim($c,',');
   }



   //base de donne !!!

   $recherche_base = file_get_contents('http://webtp.fil.univ-lille1.fr/~clerbout/carburant/recherche.php?commune=' . $commune . '&rayon=' . $rayon .'&carburants=' . $c ) ;
   $recherche_json = json_decode($recherche_base , true) ;



if(is_array($recherche_json["data"])){

   foreach ($recherche_json["data"] as $key) {
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

           require_once("../lib/db_parms.php") ;
           require_once("../lib/DataLayer.class.php") ;
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

          $notes = file_get_contents('http://webtp.fil.univ-lille1.fr/~bivolarov/PROJET2/services/findStation.php?id='. $value) ;
          $notes = json_decode($notes , true) ;

          foreach ($notes['result'] as $key_n => $value_n) {
            if($key_n== 'noteglobale'){
              $tr = $tr . " data-noteglobale=" . '"' . "$value_n"  . '"'  ;
            }
            if($key_n == 'noteaccueil'){
              $tr = $tr . " data-noteaccueil=" . '"' . "$value_n"  . '"'  ;
            }
            if($key_n == 'noteprix'){
              $tr = $tr . " data-noteprix=" . '"' . "$value_n"  . '"'  ;
            }
            if($key_n == 'noteservice'){
              $tr = $tr . " data-noteservice=" . '"' . "$value_n"  . '"';
            }
          }



      }




         if($k == "latitude"){
             $tr = $tr . " data-lat=" . '"' . "$value"  . '"'  ;
           }
           if($k == "longitude"){
             $tr = $tr . " data-lon=" . '"' . "$value" . '"' ;
           }
           if($k == "distance"){
             $tr = $tr . " data-distance=" . '"' . "$value" . '"' . "</tr>"  ;
           }


      }
    }

    echo  "<table id='communes'> <thead> <tr> <th> </th></tr> </thead> <tbody> " . $tr . "</tbody> </table>" ;
}
else{

  if($donne["message"] == "commune inexistante"){
       echo "<p id='notfound'>Commune Not found</p>" ;
     }
     else if($donne["message"] == "carburants : rejected"){
       echo "<p id='rejected'>You didn't choosed a Carburant</p>" ;
     }

   }

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
    <br>
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





  </body>
</html>
