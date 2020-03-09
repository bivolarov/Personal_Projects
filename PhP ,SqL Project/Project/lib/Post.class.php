<?php
class Post {
  public $id;
  public $auteur;
  public $station;
  public $titre;
  public $contenu;
  public $datecreation;
  public function __construct($id , $auteur , $station , $titre , $contenu , $datecreation)
  {
    $this->id = $id;
    $this->auteur = $auteur;
    $this->station = $station;
    $this->titre = $titre;
    $this->contenu = $contenu;
    $this->datecreation = $datecreation;
  }
}
?>
