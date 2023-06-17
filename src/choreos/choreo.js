class Choreo {

  constructor( actors ) {
    this.actors = actors;
    this.t = 0
  }
  
  update( dt ){
      this.t += dt
  }
}