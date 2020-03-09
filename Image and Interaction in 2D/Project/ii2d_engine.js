/**
 *
 *
 * */


var randInt=function(a,b) {
	return Math.floor(Math.random()*(b-a)+a);
}

var setAttributes=function(v,lAttrib) {
  for(var k in lAttrib) {
    v[k]=lAttrib[k];
  }
}



class Engine {
  constructor() {
    this.particleManager = new ParticleManager();
    this.time=0;
    this.deltaTime=0.006;
		this.obstacleManager = new ObstacleManager();

  }

  draw() {
		/*
    ctx.clearRect(0,0,500,500);
		ctx.fillStyle = 'rgb(0 , 0, 255)';
		ctx.fillRect(45, 45, 300, 300);

		var c = new Vector(0 , 0) ;
		c.setRandInt(new Vector(100 , 150) , new Vector(200 , 250)) ;
		ctx.fillStyle = 'rgb(255,0,0)';
		ctx.fillRect(c.x , c.y , 25 , 25) ;

		*/
		ctx.clearRect(0,0,500,500);
		this.particleManager.draw() ;

		this.obstacleManager.draw();


  }

  updateData() {
			this.particleManager.update() ;
			this.motion() ;
			this.force() ;
			this.collision() ;

			for(let i = 0 ; i < this.obstacleManager.obstacleList.length ; ++i){
				this.obstacleManager.obstacleList[i].setOldPos() ;
			}
  }

  loop() {
    this.time+=this.deltaTime;
    this.updateData();
    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
}

  start() {
    this.loop();
  }

	motion(){
		this.particleManager.motion(this.deltaTime) ;
 	}

	force(){
		this.particleManager.force();
	}

	collision(){
			for(let i = 0 ; i < this.particleManager.all.length ; ++i){
				for(let j = 0 ; j < this.obstacleManager.obstacleList.length ; ++j){
					this.solveCollision(this.particleManager.all[i] , this.obstacleManager.obstacleList[j]) ;
			}

	}
}

	solveCollision(une_particule , un_obstacle){
				let oldPosCorrec = un_obstacle.oldCorrec(une_particule.oldPosition) ;
				let d = un_obstacle.intersect(oldPosCorrec , une_particule.position) ;
				if(d.isIntersect){

					if(un_obstacle instanceof Circle){
						let vitesse_circle = un_obstacle.rustine_vitesse(this.deltaTime) ;
						this.impulse_circle(une_particule , d.normal , d.position , vitesse_circle) ;
						un_obstacle.rustine_position(une_particule) ;
						une_particule.position.set(oldPosCorrec) ;
					}
					else{
						let vitesse_segment = un_obstacle.rustine_vitesse(this.deltaTime) ;
						this.impulse_segment(une_particule , d.normal , d.position , vitesse_segment) ;
						une_particule.position.set(oldPosCorrec) ;
					}
				}

	}

	impulse_circle(p , ncol , pcol , v_circle){

			//La vitesse relative ne marche pas
			//p.velocity.add(v_circle) ;

			//Calcul n unitaire
			let n_unitaire = new Vector(ncol.x/ncol.norme() , ncol.y/ncol.norme()) ;

			//Vitesse corrige produit scalaire
			let v_new_n = new Vector(p.velocity.produitScalaire(n_unitaire)*n_unitaire.x , p.velocity.produitScalaire(n_unitaire)*n_unitaire.y) ;

			//Calcul de la nouvelle vitesse quand il y a collision
			let v_col = new Vector(-(p.velocity.x - 1.8*v_new_n.x) , -(p.velocity.y - 1.8*v_new_n.y)) ;
			//vitesse corrigee apres la collision
			p.velocity.set(v_col) ;

			//Position :

			let m_xnew = new Vector(pcol.x - p.position.x , pcol.y - p.position.y) ;
			let h = new Vector(m_xnew.produitScalaire(ncol)*ncol.x , m_xnew.produitScalaire(ncol)*ncol.y) ;

			// On applique la formule du cours
			let x_col = new Vector(p.position.x + 2*h.x , p.position.y + 2*h.y) ;

			//On change la Position
			p.position.set(x_col) ;


	}

	impulse_segment(p , ncol , pcol, v_segment){

			//La vitesse relative ne marche pas
			//p.velocity.add(v_segment) ;

			//Calcul n unitaire
			let n_unitaire = new Vector(ncol.x/ncol.norme() , ncol.y/ncol.norme()) ;

			//Vitesse corrige produit scalaire
			let v_new_n = new Vector(p.velocity.produitScalaire(n_unitaire)*n_unitaire.x , p.velocity.produitScalaire(n_unitaire)*n_unitaire.y) ;

			//Calcul de la nouvelle vitesse quand il y a collision
			let v_col = new Vector(p.velocity.x - 1.8*v_new_n.x , p.velocity.y - 1.8*v_new_n.y) ;
			//vitesse corrigee apres la collision
			p.velocity.set(v_col) ;

			//Position :

			let m_xnew = new Vector(pcol.x - p.position.x , pcol.y - p.position.y) ;
			let h = new Vector(m_xnew.produitScalaire(ncol)*ncol.x , m_xnew.produitScalaire(ncol)*ncol.y) ;

			// On applique la formule du cours
			let x_col = new Vector(p.position.x + 2*h.x , p.position.y + 2*h.y) ;

			//On change la Position
			p.position.set(x_col) ;

		}




};
