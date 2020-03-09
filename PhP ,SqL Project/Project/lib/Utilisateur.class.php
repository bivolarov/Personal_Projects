<?php
class Utilisateur {
  public $login;
  public $nom;
  public $prenom;
  public $mail;
  public $ville;
  public $description;
  public $nbavis;
  public $total;
  public $nbposts;
  public $nblike;
  public $nbnolike;
  public function __construct($login , $nom, $prenom,  $mail , $ville , $description , $nbavis , $total , $nbposts , $nblike , $nbnolike)
  {
    $this->login = $login;
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->mail = $mail;
    $this->ville = $ville;
    $this->description = $description;
    $this->nbavis = $nbavis;
    $this->total = $total;
    $this->nbposts = $nbposts;
    $this->nblike = $nblike;
    $this->nbnolike = $nbnolike;
  }
}
?>
