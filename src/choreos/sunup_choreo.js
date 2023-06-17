class SunupChoreo extends Choreo {

  constructor( actors ) {
      super(actors)
      this.phase = 0
  }
  
  update( dt ){
      super.update(dt)
      
      // shock actors
      var mint = 1000
      var maxt = 2000
      if( (this.t>mint) & (this.t<maxt) ){ 
          for( var i = 0 ; i < this.actors.length ; i++ ){
              var a = this.actors[i]
              if( (!a.shocked) & (this.t-this.actor_dts[i]>mint) ){
                a.shocked = true
              }
          }
      }
      
      // advance phase
      if( (this.phase==0) & (this.t>maxt) ){
        this.phase = 1
        this.actor_dts = this.getRandomDts(5000)
      }
      
      // unshock actors and start jumping in place
      var mint = 5000
      var maxt = 15000
      if( (this.t>mint) & (this.t<maxt) ){ 
          for( var i = 0 ; i < this.actors.length ; i++ ){
              var a = this.actors[i]
              if( a.shocked & (this.t-this.actor_dts[i]>mint) ){
                    a.shocked = false
              } else if ( (!a.shocked) & (a.state!=ActorState.Jumping) ){
                    a.targetX = a.x
                    a.startNewJump(100*(1.0-.5*Math.random()))
              }
          }
      }
      
      // switch to random choreo
      if( (this.phase==1) & (this.t>maxt) ){
        currentChoreo = new RandomChoreo(allActors);
      }
      
  }
}