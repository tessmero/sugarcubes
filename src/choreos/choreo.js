class Choreo {

  constructor( actors ) {
    this.actors = actors;
    this.t = 0
    this.actor_dts = this.getRandomDts(500)
  }
  
  update( dt ){
      this.t += dt
  }
  
  getRandomDts(max){
      var result = []
      for( var i = 0 ; i < this.actors.length ; i++ ){
          result.push(Math.random() * max)
      }
      return result
  }
}