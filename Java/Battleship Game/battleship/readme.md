            TP5 - BattleShip
-------------------------------------------
Noms : Bivolarov Stoyan , Fernandes Antoine
-------------------------------------------

Presentation du TP :
--------------------
Ce TP nous a appris comment creer une Basic Game [BattleShip] .
Pour la realisation de ce jeu , on a cree certaines classes :
      - Ship.java
      - Cell.java
      - Position.java
      - Answer.java
      - Sea.java

La classe Ship , c'est pour creer un bateau avec ses points de vie .
La classe Cell , c'est pour manipuler les cellules .
La classe Position , c'est pour gerer les coordonnes d'une cellule .
La classe Sea , c'est pour creer un tableu des cellules[Cell] de deux deminesions[rows et cols] .
La classe Answer , c'est pour nous representer l'etat de jeu .

Comment jouer ?
---------------
Pour jouer , on a creer deux classes principales : SeaMain.java et Game.java
Avant de jouer , vous devez vous mettre dans la racine du projet et en executant
dans un terminal la commande suivante : javac battleship/SeaMain.java et
java battleship.SeaMain . Apres , vous allez commencer à jouer .

JavaDoc :
---------
Tous les fichiers .java , sauf SeaMain et Game , contiennent
la javadoc necessaire avec tous les explications sur les methodes .
En executant la commande javadoc <nom du fichier>.java , vous pouvez
voir les pages html avec la javadoc fournies .
