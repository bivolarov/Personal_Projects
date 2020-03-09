

window.addEventListener("load",dessinerCarte);

// fonction de mise en place de la carte.
// Suppose qu'il existe dans le document
// un Ã©lÃ©ment possÃ©dant id="cartecampus"
function dessinerCarte(){
    // crÃ©ation de la carte, centrÃ©e sur le point 50.60976, 3.13909, niveau de zoom 16
    // cette carte sera dessinÃ©e dans l'Ã©lÃ©ment HTML "cartecampus"
    var map = L.map('cartecampus').setView([50.60976, 3.13909], 16);

    // ajout du fond de carte OpenStreetMap
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    placerMarqueurs(map);
    map.on("popupopen",activerBouton);
}

// gestionnaire d'Ã©vÃ¨nement (dÃ©clenchÃ© lors de l'ouverture d'un popup)
// cette fonction va rendre actif le bouton inclus dans le popup en lui assocaint un gestionnaire d'Ã©vÃ¨nement

function placerMarqueurs(map) {
   var l = document.querySelectorAll("table#communes>tbody>tr"); //liste de toutes les lignes
   var pointList= [];
   for (var i=0; i<l.length; i++){ // pour chaque ligne, insertion d'un marqueur sur la carte
        // insertion du marqueur selon les coordonnÃ©es trouvÃ©es dans les attributs data-lat et data-lon :
        var point = [l[i].dataset.lat, l[i].dataset.lon];
        var name = l[i].dataset.nom ;
        var marque = l[i].dataset.marque ;
        var id = l[i].dataset.id ;
        L.marker(point).addTo(map).bindPopup("Name : "+name + ", Marque : " + marque + " " + "<button value=\""+id+"\"> Information</button>").openPopup();
        pointList.push(point);
   }
   map.fitBounds(pointList);
}
// ajustement de la zone d'affichage de la carte aux points marquÃ©s

function activerBouton(ev) {
    var noeudPopup = ev.popup._contentNode; // le noeud DOM qui contient le texte du popup
    var bouton = noeudPopup.querySelector("button"); // le noeud DOM du bouton inclu dans le popup
    bouton.addEventListener("click", clickInfo); // en cas de click, on dÃ©clenche la fonction clickInfo
}


function processAnswer(answer){
  var d = document.getElementById("all_posts") ;
  if(answer.status == "ok"){
      document.getElementById('posts').innerHTML = "Les posts : " ;
      answer.liste =  answer.liste.reverse() ;
        for(var i in answer.liste){
          var f = document.createElement("form") ;
          f.id='lesposts';
                var fieldset = document.createElement("fieldset");
                fieldset.id='field';
                var legend = document.createElement("legend");
                legend.id='leg';
                var p = document.createElement("p");
                p.id='p';
                var p2 = document.createElement("p");
                p2.id='p2';
                p.innerHTML = answer.liste[i].auteur + " a dit : " ;
                p2.innerHTML = answer.liste[i].contenu ;
                legend.innerHTML = " Poste le " + answer.liste[i].datecreation ;
                fieldset.appendChild(legend) ;
                fieldset.appendChild(p);
                fieldset.appendChild(p2) ;
                f.appendChild(fieldset) ;
                d.appendChild(f);
        }
        document.getElementById("click").disabled = true;
  }
  else{
    document.getElementById('posts').innerHTML = "Pas de posts disponible ." ;
    var d = document.getElementById("all_posts");
    while (d.hasChildNodes()) {
        d.removeChild(d.firstChild);
}
  }
}



function clickInfo(){
  document.getElementById('avis').style.visibility = "visible";
  document.getElementById('posts').style.visibility = "visible";
  document.getElementById('all_posts').style.visibility = "visible";
  document.getElementById('infos').style.visibility = "visible";

  var l = document.querySelectorAll("table#communes>tbody>tr");
  for (var i=0; i<l.length; i++){
    if(this.value == l[i].dataset.id){
            document.getElementById('infos').innerHTML = "INFORMATION SUR LA STATION CHOSIE : "
            + "<br>" + "Nom : " + l[i].dataset.nom
            + "<br>" + " Ville : " + l[i].dataset.ville
            + "<br>" + " CP : " + l[i].dataset.cp
            + "<br>" + "Adresse : " + l[i].dataset.adresse
            + "<br>" + "Marque : " + l[i].dataset.marque
            + "<br>" + "Types Carburants : " + l[i].dataset.libellecarburant
            + "<br>" + "Prix : " +  l[i].dataset.prix
            + "<br>" + " Services : " + l[i].dataset.services ;


            document.getElementById('avis').innerHTML = " LES AVIS SUR LA STATION : "
              + "<br>" + " Note Globale : " + l[i].dataset.noteglobale
                + "<br>" + " Accueil : " + l[i].dataset.noteaccueil
                  + "<br>" + " Prix : " + l[i].dataset.noteprix
                    + "<br>" + " Service : " + l[i].dataset.noteservice;

            fetch("http://webtp.fil.univ-lille1.fr/~bivolarov/PROJET2/services/findPosts.php?id="+ l[i].dataset.id)
              .then(function(resp){
                return resp.json();
              })
              .then(processAnswer) ;
          }

    }
  }
