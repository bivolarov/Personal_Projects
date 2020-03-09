<?php

Class DataLayer{
    private $connexion;

    // établit la connexion à la base en utilisant les infos de connexion des constantes DB_DSN, DB_USER, DB_PASSWORD
    // susceptible de déclencher une PDOException
    public function __construct(){
            $this->connexion = new PDO(
                       DB_DSN, DB_USER, DB_PASSWORD,
                       [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,     // déclencher une exception en cas d'erreur
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // chaque ligne du résultat sera une table associative
                       ]
                     );

    }

function authentifier($login, $password){ // version password hash
  $sql = <<<EOD
         select
         login, nom, prenom , password
         from utilisateur
         where login = :login ;
EOD;
         $stmt = $this->connexion->prepare($sql);
         $stmt->bindValue(':login', $login);
         $stmt->execute();
         $info = $stmt->fetch();
         if ($info && crypt($password, $info['password']) == $info['password']){
               return new Identite($info['login'], $info['nom'], $info['prenom']);
             }
         else{
           return NULL;
         }

}



function getInfoUser($login){
  $sql = <<<EOD
  select login  , mail , ville , description , nbavis , total , nbposts , nblike , nbnolike , nom , prenom , login from utilisateur where login=:login ;
EOD;
  $stmt = $this->connexion->prepare($sql) ;
  $stmt->bindValue(":login" , $login) ;
  try{
    $stmt->execute() ;
    $ligne = $stmt->fetch() ;
    return new Utilisateur($ligne['login'],$ligne['nom'],$ligne['prenom'] , $ligne['mail'] , $ligne['ville'] , $ligne['description'] , $ligne['nbavis'] , $ligne['total'] , $ligne['nbposts'] , $ligne['nblike'] ,
    $ligne['nbnolike']) ;
}
catch(PDOException $e){
  return FALSE ;

}

}

function getAvatar($login){
  $sql = <<<EOD
  select avatar , mimetype from utilisateur where login=:login ;
EOD;
$stmt = $this->connexion->prepare($sql) ;
$stmt->bindValue(":login" , $login) ;
try{
  $stmt->execute() ;
  $ligne = $stmt->fetch() ;
  return $ligne ;

}

catch(PDOException $e){
  return FALSE ;

}

}

function findBestStations(){
  $sql = <<<EOD
  select * from stationsp2 order by noteglobale ;
EOD;
$stmt = $this->connexion->prepare($sql) ;
try{
  $stmt->execute() ;
  $ligne = $stmt->fetchAll() ;
  $new_array = array() ;
  foreach ($ligne as $key => $value) {
    if(is_array($value)){
      array_push($new_array , new Station($value['id'], $value['nom'] , $value['marque'] , $value['latitude'] , $value['longitude'] , $value['adresse'] , $value['cp'] , $value['ville'] , $value['nbnotes'] ,
       $value['noteglobale'] , $value['noteaccueil'] , $value['noteprix'] , $value['noteservice'])) ;
    }
  }
  return $new_array ;

}

catch(PDOException $e){
  return FALSE ;

}
}


function findStation($id) {

  $sql = <<<EOD
  select  nom , marque , latitude , longitude , adresse , cp , ville , nbnotes , noteglobale , noteaccueil , noteprix , noteservice from stationsp2 where id=:id;
EOD;
$stmt = $this->connexion->prepare($sql) ;
$stmt->bindValue(":id" , $id) ;
try{
  $stmt->execute() ;
  $ligne = $stmt->fetch() ;
  return new Station($ligne['id'],$ligne['nom'] , $ligne['marque'] , $ligne['latitude'] , $ligne['longitude'] , $ligne['adresse'] , $ligne['cp'] , $ligne['ville'] , $ligne['nbnotes'] , $ligne['noteglobale'] ,
   $ligne['noteaccueil'] , $ligne['noteprix'] , $ligne['noteservice']) ;
}

catch(PDOException $e){
  return FALSE ;

}


}


function findPosts($id){
  $sql = <<<EOD
  select * from post where station=:id ;
EOD;
  $stmt = $this->connexion->prepare($sql) ;
  $stmt->bindValue(":id" , $id) ;
  try{
    $stmt->execute() ;
    $ligne = $stmt->fetchALl() ;
    $new_array = array() ;
    foreach ($ligne as $key => $value) {
      if(is_array($value)){
        array_push($new_array ,new Post($value['id'] , $value['auteur'] , $value['station'] , $value['titre'] , $value['contenu'] , $value['datecreation'])) ;
      }
    }
    return $new_array ;

  }
  catch(PDOException $e){
    return FALSE ;

  }


}

function findMesPosts($login){
  $sql = <<<EOD
  select * from post where auteur=:login;
EOD;
$stmt = $this->connexion->prepare($sql) ;
$stmt->bindValue(":login" , $login) ;
try{
  $stmt->execute() ;
  $ligne = $stmt->fetchALl() ;
  $new_array = array() ;
  foreach ($ligne as $key => $value) {
    if(is_array($value)){
      array_push($new_array ,new Post($value['id'] , $value['auteur'] , $value['station'] , $value['titre'] , $value['contenu'] , $value['datecreation']) ) ;
    }
  }
  return $new_array ;
}
catch(PDOException $e){
  return FALSE ;

}

}



function noteStation($login , $id , $noteglobale , $noteaccueil ,
                           $noteprix , $noteservice){
     // On change d'abord les valeurs concernées dans station
    $sql = <<<EOD
    UPDATE stationsp2
    SET noteglobale =:noteglobale,
        noteaccueil =:noteaccueil,
        noteprix =:noteprix,
        noteservice=:noteservice ,
        nbnotes=nbnotes+1
    WHERE id=:id
EOD;
    $stmt = $this->connexion->prepare($sql); // préparation de la requête
    $stmt->bindValue(':id' , $id) ;
    $stmt->bindValue(':noteglobale' , $noteglobale) ;
    $stmt->bindValue(':noteaccueil' , $noteaccueil) ;
    $stmt->bindValue(':noteprix' , $noteprix) ;
    $stmt->bindValue(':noteservice' , $noteservice) ;
    try {
      $stmt->execute();
      $somme = $noteglobale+$noteaccueil+$noteprix+$noteservice;
      $passed = true ;

    } catch (\Exception $e) {
      return false ;
    }


    if ($passed) {
      // On modifie le nombre d'avis et le total de l'utilisateur
    $sql = <<<EOD
    UPDATE utilisateur
    SET nbavis=nbavis+1 , total=total+:tot
    WHERE login=:login
EOD;
    $stmt = $this->connexion->prepare($sql); // préparation de la requête
    $stmt->bindValue(':tot' , $somme) ;
    $stmt->bindValue(':login' , $login) ;

    try {
      $stmt->execute();
      $passed = true ;
    } catch (\Exception $e) {
      return false ;
    }
    }


    if ($passed) {
      // Requete pour afficher la station donnée
     $sql2 = <<<EOD
     Select *
     from stationsp2
     where id=:id
EOD;
     $stmt = $this->connexion->prepare($sql2); // préparation de la requête
     $stmt->bindValue(':id' , $id) ;
     $stmt->execute();
     $res = $stmt->fetch();
     if ($res) {
        $id = $res['id'] ;
        $marque = $res['marque'] ;
        $nom = $res['nom'] ;
        $latitude = $res['latitude'] ;
        $longitude = $res['longitude'] ;
        $adresse = $res['adresse'] ;
        $ville = $res['ville'] ;
        $cp = $res['cp'] ;
        $nbnotes = $res['nbnotes'] ;
        $noteglobale = $res['noteglobale'] ;
        $noteaccueil = $res['noteaccueil'] ;
        $noteprix = $res['noteprix'] ;
        $noteservice = $res['noteservice'] ;

        return new Station($res['id'],$res['nom'] , $res['marque'] , $res['latitude'] , $res['longitude'] , $res['adresse'] , $res['cp'] , $res['ville'] , $res['nbnotes'] ,
         $res['noteglobale'] ,  $res['noteaccueil'] , $res['noteprix'] , $res['noteservice']) ;
     }else {
        return false ;
     }
   }
   else {
     return false ;
   }

   }


function resultNoteStation($id){
  $sql = <<<EOD
  select  id , nom , marque , latitude , longitude , adresse , cp , ville , nbnotes , noteglobale , noteaccueil , noteprix , noteservice from stationsp2 where id=:id;
EOD;
$stmt = $this->connexion->prepare($sql) ;
$stmt->bindValue(":id" , $id) ;
try{
  $stmt->execute() ;
  $ligne = $stmt->fetch() ;
  return new Station($ligne['id'],$ligne['nom'] , $ligne['marque'] , $ligne['latitude'] , $ligne['longitude'] , $ligne['adresse'] , $ligne['cp'] , $ligne['ville'] , $ligne['nbnotes'] , $ligne['noteglobale'] ,
   $ligne['noteaccueil'] , $ligne['noteprix'] , $ligne['noteservice']) ;
}

catch(PDOException $e){
  return FALSE ;

}
}



function createPost($auteur ,$station , $titre , $contenu){
  date_default_timezone_set ('Europe/Paris');
  $sql = <<<EOD
  insert into post (auteur , station , titre , contenu , datecreation)
  values (:auteur , :station , :titre , :contenu , :datecreation);
EOD;
  $stmt = $this->connexion->prepare($sql) ;
  $stmt->bindValue(":auteur" , $auteur) ;
  $stmt->bindValue(":station" , $station) ;
  $stmt->bindValue(":titre" , $titre) ;
  $stmt->bindValue(":contenu" , $contenu) ;
  $stmt->bindValue(":datecreation" , date('d/m/Y H:i:s')) ;
  try{
    $stmt->execute() ;
    return TRUE ;
  }
  catch(PDOException $e){
    return $e->getMessage() ;
  }
  }


function getId($station){
  $sql = <<<EOD
  select id from post where station=:station ;
EOD;
  $stmt = $this->connexion->prepare($sql) ;
  $stmt->bindValue(":station" , $station) ;
  try{
  $stmt->execute() ;
  $ligne = $stmt->fetch() ;
  return $ligne['id'] ;

}
catch(PDOException $e){
  return $e->getMessage() ;
}

}

function deletePost($id){
  $sql = <<<EOD
  delete from post where id=:id ;
EOD;
  $stmt = $this->connexion->prepare($sql) ;
  $stmt->bindValue(":id" , $id) ;
  try{
  $stmt->execute() ;
  return TRUE ;

}
catch(PDOException $e){
  return $e->getMessage() ;
}

}


function notePost($id ,$avis){
  $sql = <<<EOD
  update post
  set noteglobale=:global , noteaccueil=:accueil , noteprix=:prix , noteservice=:service
  where id=:id ;
EOD;
  $stmt = $this->connexion->prepare($sql) ;
}


function createUser($login , $password , $nom , $prenom){
  $sql = <<<EOD
  INSERT INTO utilisateur (login , password , nom , prenom)
  VALUES (:login , :password , :nom , :prenom);
EOD;
$stmt = $this->connexion->prepare($sql) ;
$stmt->bindValue(":login" , $login) ;
$stmt->bindValue(":password" , password_hash($password,CRYPT_BLOWFISH)) ;
$stmt->bindValue(":nom" , $nom) ;
$stmt->bindValue(":prenom" , $prenom) ;
try{
$stmt->execute() ;
return $stmt->rowCount() == 1 ;
}
catch(PDOException $e){
return FALSE ;
}
}


function getlogin($login){
  $sql = <<<EOD
  select login , password from utilisateur where login=:login ;
EOD;
  $stmt = $this->connexion->prepare($sql) ;
  $stmt->bindValue(":login" , $login) ;
  try{
  $stmt->execute() ;
  $ligne = $stmt->fetch() ;
  return $ligne['login'] ;

}catch(PDOException $e){
  return FALSE ;
}
}


function updateProfil($login, $mail , $description , $ville , $password){
  $sql = <<<EOD
  update utilisateur
  set  mail=:mail , description=:description , ville=:ville , password=:password
  where login=:login ;
EOD;
  $stmt = $this->connexion->prepare($sql) ;
  $stmt->bindValue(":login" , $login) ;
  $stmt->bindValue(":mail" , $mail) ;
  $stmt->bindValue(":description" , $description) ;
  $stmt->bindValue(":ville" , $ville) ;
  $stmt->bindValue(":password" , password_hash($password,CRYPT_BLOWFISH)) ;
  try{
  $stmt->execute() ;
  return TRUE ;
}
catch(PDOException $e){
  return FALSE ;
}
}

function getUpdatedProfil($login){
  $sql = <<<EOD
  select * from utilisateur where login=:login ;
EOD;
  $stmt = $this->connexion->prepare($sql) ;
  $stmt->bindValue(":login" , $login) ;
  try{
    $stmt->execute() ;
    $ligne = $stmt->fetch() ;
    return new Utilisateur($ligne['login'],$ligne['nom'],$ligne['prenom'] , $ligne['mail'] , $ligne['ville'] , $ligne['description'] , $ligne['nbavis'] , $ligne['total'] , $ligne['nbposts'] , $ligne['nblike'] ,
    $ligne['nbnolike']) ;
}
catch(PDOException $e){
  return FALSE ;
}
}


function getAdditionalInfo($id){

    $stmt = $this->connexion->prepare("select marque , nom , adresse , ville , cp  from stationsp2  where id=:id ;") ;
    $stmt->bindValue(':id' , $id) ;
    try{
    $stmt->execute() ;
    return $stmt->fetchAll(\PDO::FETCH_ASSOC);
  }
  catch(PDOException $e){
    return FALSE ;

  }
}

function login($login){
    $sql = <<<EOD
    select login , nom , prenom
    from utilisateur
    where login=:login ;
EOD;

   $stmt = $this->connexion->prepare($sql) ;
   $stmt->bindValue(':login' , $login) ;
   try{
     $stmt->execute() ;
     $ligne = $stmt->fetch() ;
     return new Identite($ligne['login'] , $ligne['nom'] , $ligne['prenom']) ;
   }
   catch (PDOException $e) {
     echo $e->getMessage() ;
     return FALSE ;
   }

  }





}
?>
