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
  document.getElementById('avis_station').style.visibility = "visible";
  document.getElementById('comment').style.visibility = "visible";

  var d = document.getElementById("comment");
  while (d.hasChildNodes()) {
      d.removeChild(d.firstChild);
}
  var d = document.getElementById("avis_station") ;
  while (d.hasChildNodes()) {
      d.removeChild(d.firstChild);
}

  var l = document.querySelectorAll("table#communes>tbody>tr");
  document.getElementById('infos').innerHTML = "INFORMATION sur la GAS STATION" ;
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


              document.getElementById("myForm").innerHTML = "Je donne mon avis :" ;

              var form_avis = document.getElementById("avis_station") ;

              //input id station
              var d = document.createElement("div") ;
              d.innerHTML = "Identifiant de la Station : " ;
              var inp = document.createElement("input") ;
              inp.setAttribute("type" , "text") ;
              inp.id = "id" ;
              inp.name = "id" ;
              inp.value = l[i].dataset.id ;
              d.appendChild(inp) ;
              form_avis.appendChild(d) ;

              //first input
              var div1 = document.createElement("div") ;
              var in1 = document.createElement("input") ;
              in1.setAttribute("type" , "text") ;
              in1.name= 'noteglobale' ;
              in1.id = 'noteglobale' ;

              div1.innerHTML = "Note Globale : " ;
              div1.appendChild(in1) ;
              form_avis.appendChild(div1) ;

              //second input
              var div2 = document.createElement("div") ;
              var in2 = document.createElement("input") ;
              in2.setAttribute("type" , "text") ;
              in2.name= 'noteaccueil' ;
              in2.id = 'noteaccueil' ;
              div2.innerHTML = "Note Accueil : " ;
              div2.appendChild(in2) ;
              form_avis.appendChild(div2) ;

              //third input
              var div3 = document.createElement("div") ;
              var in3 = document.createElement("input") ;
              in3.setAttribute("type" , "text") ;
              in3.name= 'noteprix' ;
              in3.id = 'noteprix' ;
              div3.innerHTML = "Note Prix : " ;
              div3.appendChild(in3) ;
              form_avis.appendChild(div3) ;

              //fourth input
              var div4 = document.createElement("div") ;
              var in4 = document.createElement("input") ;
              in4.setAttribute("type" , "text") ;
              in4.name= 'noteservice' ;
              in4.id = 'noteservice' ;
              div4.innerHTML = "Note Service : " ;
              div4.appendChild(in4) ;
              form_avis.appendChild(div4) ;

              //Submit
              var submit_avis = document.createElement("input") ;
              submit_avis.type = "submit" ;
              submit_avis.value = "Submit" ;
              form_avis.appendChild(submit_avis) ;

              //Finished the note station form

              //Creating the Post Box
              var form = document.getElementById("comment") ;
              document.getElementById("jeposte").innerHTML = "Je poste : " ;

              var div_id = document.createElement("div") ;
              div_id.innerHTML = "Identifiant de la Station : " ;
              var station_id = document.createElement("input") ;
              station_id.setAttribute("type" , "text") ;
              station_id.id = "id_station" ;
              station_id.name = "id_station" ;
              station_id.value = l[i].dataset.id ;
              div_id.appendChild(station_id) ;
              form.appendChild(div_id) ;

              var div_title = document.createElement("div") ;
              div_title.innerHTML = "Titre : " ;
              var title = document.createElement("input") ;
              title.setAttribute("type" , "text") ;
              title.id = "title" ;
              title.name = "title" ;
              title.required="required" ;
              div_title.appendChild(title) ;
              form.appendChild(div_title) ;

              var div_contenu = document.createElement("div") ;
              div_contenu.innerHTML = "Contenu : " ;
              var comment_box = document.createElement("textarea") ;
              comment_box.name = "comments" ;
              comment_box.id = "comments" ;
              comment_box.required = "required" ;
              comment_box.rows="4" ;
              comment_box.cols="50" ;
              comment_box.style="font-family:sans-serif;font-size:1.2em;" ;
              div_contenu.appendChild(comment_box) ;
              form.appendChild(div_contenu) ;

              var submit = document.createElement("input") ;
              submit.type = "submit" ;
              submit.value = "Submit" ;
              form.appendChild(submit) ;

              //Finish the Post Box

          }

    }
  }
