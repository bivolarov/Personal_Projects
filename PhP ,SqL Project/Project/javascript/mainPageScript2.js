window.addEventListener("load",dessinerCarte);



function dessinerCarte(){

    var map = L.map('cartecampus').setView([50.60976, 3.13909], 16);

    // ajout du fond de carte OpenStreetMap
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

     var l = document.querySelectorAll("table#communes>tbody>tr");
     var pointList= [];
     for(var i=0; i<l.length; i++){ // pour chaque ligne, insertion d'un marqueur sur la carte
          // insertion du marqueur selon les coordonnÃ©es trouvÃ©es dans les attributs data-lat et data-lon :
          var point = [l[i].dataset.lat, l[i].dataset.lon];
          var name = l[i].dataset.nom ;
          var marque = l[i].dataset.marque ;
          var id = l[i].dataset.id ;
          L.marker(point).addTo(map).bindPopup("Name : "+name + ", Marque : " + marque + " " + "<button id='click' value=\""+id+"\"> Information et Posts</button>").openPopup();
          pointList.push(point);
     }
     map.on("popupopen",activerBouton);
}


function activerBouton(ev) {
    var noeudPopup = ev.popup._contentNode; // le noeud DOM qui contient le texte du popup
    var bouton = noeudPopup.querySelector("button"); // le noeud DOM du bouton inclu dans le popup
    bouton.addEventListener("click", clickInfo); // en cas de click, on dÃ©clenche la fonction clickInfo
}

function processAnswer(answer){


  var d = document.getElementById("all_posts") ;
  if(answer.status == "ok"){
      document.getElementById('posts').innerHTML = "<h2> Les posts : </h2>" ;
        answer.liste = answer.liste.reverse() ;
        for(var i in answer.liste){
          var f = document.createElement("form") ;
                var fieldset = document.createElement("fieldset");
                var legend = document.createElement("legend");
                var p = document.createElement("p");
                var p2 = document.createElement("p");
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
  document.getElementById('premiere').style.display = "none";
  document.getElementById('deuxieme').style.display = "none";
  document.getElementById('troisieme').style.display = "none";
  document.getElementById('quatrieme').style.display = "none";
  document.getElementById('cinquieme').style.display = "none";
  document.getElementById('sixieme').style.display = "none";
  document.getElementById('septieme').style.display = "none";
  document.getElementById('huitieme').style.display = "none";
  document.getElementById('neuvieme').style.display = "none";
  document.getElementById('dixieme').style.display = "none";
  document.getElementById('avis').style.visibility = "visible";
  document.getElementById('posts').style.visibility = "visible";
  document.getElementById('all_posts').style.visibility = "visible";
  document.getElementById('titre').innerHTML = "informations sur la station : ";


  document.getElementById('first').innerHTML = "" ;
  document.getElementById('second').innerHTML = "" ;
  document.getElementById('three').innerHTML = "" ;
  document.getElementById('four').innerHTML = "" ;
  document.getElementById('five').innerHTML = "" ;
  document.getElementById('six').innerHTML = "" ;
  document.getElementById('seven').innerHTML = "" ;
  document.getElementById('eight').innerHTML = "" ;
  document.getElementById('nine').innerHTML = "" ;
  document.getElementById('ten').innerHTML = "" ;

  document.getElementById('nom_first').innerHTML = "" ;
  document.getElementById('marque_first').innerHTML = "" ;
  document.getElementById('adresse_first').innerHTML = "" ;
  document.getElementById('carburants_first').innerHTML =  "" ;
  document.getElementById('prix_first').innerHTML = "" ;
  document.getElementById('services_first').innerHTML = "" ;
  document.getElementById('cp_first').innerHTML = "" ;
  document.getElementById('ville_first').innerHTML = "" ;
  document.getElementById('nom_second').innerHTML = "" ;
  document.getElementById('marque_second').innerHTML = "" ;
  document.getElementById('adresse_second').innerHTML = "" ;
  document.getElementById('carburants_second').innerHTML =  "" ;
  document.getElementById('prix_second').innerHTML = "" ;
  document.getElementById('services_second').innerHTML = "" ;
  document.getElementById('cp_second').innerHTML = "" ;
  document.getElementById('ville_second').innerHTML = "" ;
  document.getElementById('nom_three').innerHTML = "" ;
  document.getElementById('marque_three').innerHTML = "" ;
  document.getElementById('adresse_three').innerHTML = "" ;
  document.getElementById('carburants_three').innerHTML =  "" ;
  document.getElementById('prix_three').innerHTML = "" ;
  document.getElementById('services_three').innerHTML = "" ;
  document.getElementById('cp_three').innerHTML = "" ;
  document.getElementById('ville_three').innerHTML = "" ;
  document.getElementById('nom_four').innerHTML = "" ;
  document.getElementById('marque_four').innerHTML = "" ;
  document.getElementById('adresse_four').innerHTML = "" ;
  document.getElementById('carburants_four').innerHTML =  "" ;
  document.getElementById('prix_four').innerHTML = "" ;
  document.getElementById('services_four').innerHTML = "" ;
  document.getElementById('cp_four').innerHTML = "" ;
  document.getElementById('ville_four').innerHTML = "" ;
  document.getElementById('nom_five').innerHTML = "" ;
  document.getElementById('marque_five').innerHTML = "" ;
  document.getElementById('adresse_five').innerHTML = "" ;
  document.getElementById('carburants_five').innerHTML =  "" ;
  document.getElementById('prix_five').innerHTML = "" ;
  document.getElementById('services_five').innerHTML = "" ;
  document.getElementById('cp_five').innerHTML = "" ;
  document.getElementById('ville_five').innerHTML = "" ;
  document.getElementById('nom_six').innerHTML = "" ;
  document.getElementById('marque_six').innerHTML = "" ;
  document.getElementById('adresse_six').innerHTML = "" ;
  document.getElementById('carburants_six').innerHTML =  "" ;
  document.getElementById('prix_six').innerHTML = "" ;
  document.getElementById('services_six').innerHTML = "" ;
  document.getElementById('cp_six').innerHTML = "" ;
  document.getElementById('ville_six').innerHTML = "" ;
  document.getElementById('nom_seven').innerHTML = "" ;
  document.getElementById('marque_seven').innerHTML = "" ;
  document.getElementById('adresse_seven').innerHTML = "" ;
  document.getElementById('carburants_seven').innerHTML =  "" ;
  document.getElementById('prix_seven').innerHTML = "" ;
  document.getElementById('services_seven').innerHTML = "" ;
  document.getElementById('cp_seven').innerHTML = "" ;
  document.getElementById('ville_seven').innerHTML = "" ;
  document.getElementById('nom_eight').innerHTML = "" ;
  document.getElementById('marque_eight').innerHTML = "" ;
  document.getElementById('adresse_eight').innerHTML = "" ;
  document.getElementById('carburants_eight').innerHTML =  "" ;
  document.getElementById('prix_eight').innerHTML = "" ;
  document.getElementById('services_eight').innerHTML = "" ;
  document.getElementById('cp_eight').innerHTML = "" ;
  document.getElementById('ville_eight').innerHTML = "" ;
  document.getElementById('nom_nine').innerHTML = "" ;
  document.getElementById('marque_nine').innerHTML = "" ;
  document.getElementById('adresse_nine').innerHTML = "" ;
  document.getElementById('carburants_nine').innerHTML =  "" ;
  document.getElementById('prix_nine').innerHTML = "" ;
  document.getElementById('services_nine').innerHTML = "" ;
  document.getElementById('cp_nine').innerHTML = "" ;
  document.getElementById('ville_nine').innerHTML = "" ;
  document.getElementById('nom_ten').innerHTML = "" ;
  document.getElementById('marque_ten').innerHTML = "" ;
  document.getElementById('adresse_ten').innerHTML = "" ;
  document.getElementById('carburants_ten').innerHTML =  "" ;
  document.getElementById('prix_ten').innerHTML = "" ;
  document.getElementById('services_ten').innerHTML = "" ;
  document.getElementById('cp_ten').innerHTML = "" ;
  document.getElementById('ville_ten').innerHTML = "" ;

  var d = document.getElementById("comment");
  while (d.hasChildNodes()) {
      d.removeChild(d.firstChild);
}
  var d = document.getElementById("avis_station") ;
  while (d.hasChildNodes()) {
      d.removeChild(d.firstChild);
}

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

              //Creating the Note station form


              var form_avis = document.getElementById("avis_station") ;
              var fieldset = document.createElement("fieldset");
              //input id station
              var legend = document.createElement("legend");
              legend.innerHTML = "Je donne mon avis : " ;
              fieldset.appendChild(legend) ;
              var d = document.createElement("div") ;
              d.innerHTML = "Identifiant de la Station : " ;
              var inp = document.createElement("input") ;
              inp.setAttribute("type" , "text") ;
              inp.id = "id" ;
              inp.name = "id" ;
              inp.value = l[i].dataset.id ;
              d.appendChild(inp) ;
              fieldset.appendChild(d) ;

              //first input
              var div1 = document.createElement("div") ;
              var in1 = document.createElement("input") ;
              in1.setAttribute("type" , "text") ;
              in1.name= 'noteglobale' ;
              in1.id = 'noteglobale' ;

              div1.innerHTML = "Note Globale : " ;
              div1.appendChild(in1) ;
              fieldset.appendChild(div1) ;

              //second input
              var div2 = document.createElement("div") ;
              var in2 = document.createElement("input") ;
              in2.setAttribute("type" , "text") ;
              in2.name= 'noteaccueil' ;
              in2.id = 'noteaccueil' ;
              div2.innerHTML = "Note Accueil : " ;
              div2.appendChild(in2) ;
              fieldset.appendChild(div2) ;

              //third input
              var div3 = document.createElement("div") ;
              var in3 = document.createElement("input") ;
              in3.setAttribute("type" , "text") ;
              in3.name= 'noteprix' ;
              in3.id = 'noteprix' ;
              div3.innerHTML = "Note Prix : " ;
              div3.appendChild(in3) ;
              fieldset.appendChild(div3) ;

              //fourth input
              var div4 = document.createElement("div") ;
              var in4 = document.createElement("input") ;
              in4.setAttribute("type" , "text") ;
              in4.name= 'noteservice' ;
              in4.id = 'noteservice' ;
              div4.innerHTML = "Note Service : " ;
              div4.appendChild(in4) ;
              fieldset.appendChild(div4) ;

              //Submit
              var submit_avis = document.createElement("input") ;
              submit_avis.type = "submit" ;
              submit_avis.value = "Submit" ;
              fieldset.appendChild(submit_avis) ;
              form_avis.appendChild(fieldset) ;

              //Finished the note station form

              //Creating the Post Box
              var form = document.getElementById("comment") ;
              var fieldset_2 = document.createElement("fieldset") ;
              var legend_2 = document.createElement("legend") ;
              legend_2.innerHTML = "Je poste : " ;
              fieldset_2.appendChild(legend_2) ;


              var div_id = document.createElement("div") ;
              div_id.innerHTML = "Identifiant de la Station : " ;
              var station_id = document.createElement("input") ;
              station_id.setAttribute("type" , "text") ;
              station_id.id = "id_station" ;
              station_id.name = "id_station" ;
              station_id.value = l[i].dataset.id ;
              div_id.appendChild(station_id) ;
              fieldset_2.appendChild(div_id) ;

              var div_title = document.createElement("div") ;
              div_title.innerHTML = "Titre : " ;
              var title = document.createElement("input") ;
              title.setAttribute("type" , "text") ;
              title.id = "title" ;
              title.name = "title" ;
              title.required="required" ;
              div_title.appendChild(title) ;
              fieldset_2.appendChild(div_title) ;

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
              fieldset_2.appendChild(div_contenu) ;

              var submit = document.createElement("input") ;
              submit.type = "submit" ;
              submit.value = "Submit" ;
              fieldset_2.appendChild(submit) ;
              form.appendChild(fieldset_2) ;
              //Finish the Post Box

    }
  }
}



var l = document.querySelectorAll("table#communes>tbody>tr");
for(var i=0; i<l.length; i++){
        if(i==0){
          document.getElementById('nom_first').innerHTML = "Nom : " + l[i].dataset.nom ;
          document.getElementById('marque_first').innerHTML = "Marque : " + l[i].dataset.marque ;
          document.getElementById('adresse_first').innerHTML = "Adresse : " + l[i].dataset.adresse ;
          document.getElementById('carburants_first').innerHTML =  "Types Carburants : " + l[i].dataset.libellecarburant ;
          document.getElementById('prix_first').innerHTML = "Prix : " +  l[i].dataset.prix ;
          document.getElementById('services_first').innerHTML = " Services : " + l[i].dataset.services ;
          document.getElementById('cp_first').innerHTML = " CP : " + l[i].dataset.cp ;
          document.getElementById('ville_first').innerHTML = " Ville : " + l[i].dataset.ville ;
        }
        if(i==1){
          document.getElementById('nom_second').innerHTML = "Nom : " + l[i].dataset.nom ;
          document.getElementById('marque_second').innerHTML = "Marque : " + l[i].dataset.marque ;
          document.getElementById('adresse_second').innerHTML = "Adresse : " + l[i].dataset.adresse ;
          document.getElementById('carburants_second').innerHTML =  "Types Carburants : " + l[i].dataset.libellecarburant ;
          document.getElementById('prix_second').innerHTML = "Prix : " +  l[i].dataset.prix ;
          document.getElementById('services_second').innerHTML = " Services : " + l[i].dataset.services ;
          document.getElementById('cp_second').innerHTML = " CP : " + l[i].dataset.cp ;
          document.getElementById('ville_second').innerHTML = " Ville : " + l[i].dataset.ville ;
        }
        if(i==2){
          document.getElementById('nom_three').innerHTML = "Nom : " + l[i].dataset.nom ;
          document.getElementById('marque_three').innerHTML = "Marque : " + l[i].dataset.marque ;
          document.getElementById('adresse_three').innerHTML = "Adresse : " + l[i].dataset.adresse ;
          document.getElementById('carburants_three').innerHTML =  "Types Carburants : " + l[i].dataset.libellecarburant ;
          document.getElementById('prix_three').innerHTML = "Prix : " +  l[i].dataset.prix ;
          document.getElementById('services_three').innerHTML = " Services : " + l[i].dataset.services ;
          document.getElementById('cp_three').innerHTML = " CP : " + l[i].dataset.cp ;
          document.getElementById('ville_three').innerHTML = " Ville : " + l[i].dataset.ville ;
        }
        if(i==3){
          document.getElementById('nom_four').innerHTML = "Nom : " + l[i].dataset.nom ;
          document.getElementById('marque_four').innerHTML = "Marque : " + l[i].dataset.marque ;
          document.getElementById('adresse_four').innerHTML = "Adresse : " + l[i].dataset.adresse ;
          document.getElementById('carburants_four').innerHTML =  "Types Carburants : " + l[i].dataset.libellecarburant ;
          document.getElementById('prix_four').innerHTML = "Prix : " +  l[i].dataset.prix ;
          document.getElementById('services_four').innerHTML = " Services : " + l[i].dataset.services ;
          document.getElementById('cp_four').innerHTML = " CP : " + l[i].dataset.cp ;
          document.getElementById('ville_four').innerHTML = " Ville : " + l[i].dataset.ville ;
        }
        if(i==4){
          document.getElementById('nom_five').innerHTML = "Nom : " + l[i].dataset.nom ;
          document.getElementById('marque_five').innerHTML = "Marque : " + l[i].dataset.marque ;
          document.getElementById('adresse_five').innerHTML = "Adresse : " + l[i].dataset.adresse ;
          document.getElementById('carburants_five').innerHTML =  "Types Carburants : " + l[i].dataset.libellecarburant ;
          document.getElementById('prix_five').innerHTML = "Prix : " +  l[i].dataset.prix ;
          document.getElementById('services_five').innerHTML = " Services : " + l[i].dataset.services ;
          document.getElementById('cp_five').innerHTML = " CP : " + l[i].dataset.cp ;
          document.getElementById('ville_five').innerHTML = " Ville : " + l[i].dataset.ville ;
        }
        if(i==5){
          document.getElementById('nom_six').innerHTML = "Nom : " + l[i].dataset.nom ;
          document.getElementById('marque_six').innerHTML = "Marque : " + l[i].dataset.marque ;
          document.getElementById('adresse_six').innerHTML = "Adresse : " + l[i].dataset.adresse ;
          document.getElementById('carburants_six').innerHTML =  "Types Carburants : " + l[i].dataset.libellecarburant ;
          document.getElementById('prix_six').innerHTML = "Prix : " +  l[i].dataset.prix ;
          document.getElementById('services_six').innerHTML = " Services : " + l[i].dataset.services ;
          document.getElementById('cp_six').innerHTML = " CP : " + l[i].dataset.cp ;
          document.getElementById('ville_six').innerHTML = " Ville : " + l[i].dataset.ville ;
        }
        if(i==6){
          document.getElementById('nom_seven').innerHTML = "Nom : " + l[i].dataset.nom ;
          document.getElementById('marque_seven').innerHTML = "Marque : " + l[i].dataset.marque ;
          document.getElementById('adresse_seven').innerHTML = "Adresse : " + l[i].dataset.adresse ;
          document.getElementById('carburants_seven').innerHTML =  "Types Carburants : " + l[i].dataset.libellecarburant ;
          document.getElementById('prix_seven').innerHTML = "Prix : " +  l[i].dataset.prix ;
          document.getElementById('services_seven').innerHTML = " Services : " + l[i].dataset.services ;
          document.getElementById('cp_seven').innerHTML = " CP : " + l[i].dataset.cp ;
          document.getElementById('ville_seven').innerHTML = " Ville : " + l[i].dataset.ville ;
        }
        if(i==7){
          document.getElementById('nom_eight').innerHTML = "Nom : " + l[i].dataset.nom ;
          document.getElementById('marque_eight').innerHTML = "Marque : " + l[i].dataset.marque ;
          document.getElementById('adresse_eight').innerHTML = "Adresse : " + l[i].dataset.adresse ;
          document.getElementById('carburants_eight').innerHTML =  "Types Carburants : " + l[i].dataset.libellecarburant ;
          document.getElementById('prix_eight').innerHTML = "Prix : " +  l[i].dataset.prix ;
          document.getElementById('services_eight').innerHTML = " Services : " + l[i].dataset.services ;
          document.getElementById('cp_eight').innerHTML = " CP : " + l[i].dataset.cp ;
          document.getElementById('ville_eight').innerHTML = " Ville : " + l[i].dataset.ville ;
        }
        if(i==8){
          document.getElementById('nom_nine').innerHTML = "Nom : " + l[i].dataset.nom ;
          document.getElementById('marque_nine').innerHTML = "Marque : " + l[i].dataset.marque ;
          document.getElementById('adresse_nine').innerHTML = "Adresse : " + l[i].dataset.adresse ;
          document.getElementById('carburants_nine').innerHTML =  "Types Carburants : " + l[i].dataset.libellecarburant ;
          document.getElementById('prix_nine').innerHTML = "Prix : " +  l[i].dataset.prix ;
          document.getElementById('services_nine').innerHTML = " Services : " + l[i].dataset.services ;
          document.getElementById('cp_nine').innerHTML = " CP : " + l[i].dataset.cp ;
          document.getElementById('ville_nine').innerHTML = " Ville : " + l[i].dataset.ville ;
        }
        if(i==9){
          document.getElementById('nom_ten').innerHTML = "Nom : " + l[i].dataset.nom ;
          document.getElementById('marque_ten').innerHTML = "Marque : " + l[i].dataset.marque ;
          document.getElementById('adresse_ten').innerHTML = "Adresse : " + l[i].dataset.adresse ;
          document.getElementById('carburants_ten').innerHTML =  "Types Carburants : " + l[i].dataset.libellecarburant ;
          document.getElementById('prix_ten').innerHTML = "Prix : " +  l[i].dataset.prix ;
          document.getElementById('services_ten').innerHTML = " Services : " + l[i].dataset.services ;
          document.getElementById('cp_ten').innerHTML = " CP : " + l[i].dataset.cp ;
          document.getElementById('ville_ten').innerHTML = " Ville : " + l[i].dataset.ville ;
        }

}
