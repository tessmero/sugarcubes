class RandomChoreo extends Choreo {

  constructor( actors ) {
      super(actors)
  }
  
  update( dt ){
      super.update(dt)
      
      for( var i = 0 ; i < this.actors.length ; i++ ){
          var a = this.actors[i]
          if( (a.state==ActorState.Idle) & (Math.random() < .0001*dt) ){
            a.targetX = getRandomX();
          }
      }
      
      nudgeOverlappingActors(this.actors,dt)
  }
}