
class Actor {

      constructor(x) {
          this.x = x
          this.t = 0
          this.state = ActorState.Idle;
          this.targetX = x;
          this.jumpPath = null;
          
          this.eyesOpen = true;
          this.mouthOpen = true;
      }
      
    getY(){
        if( this.state == ActorState.Jumping ) {
            return this.jumpPath.getY();
        } else {
            return 0;
        }
    }
    
    atTarget(){
        return Math.abs(this.targetX-this.x)<actorXTolerance
    }
      
    update(dt){
        this.t += dt
        
        if( Math.random() < .0001*dt ){
            this.eyesOpen = !this.eyesOpen;  
        }

        if( Math.random() < .0001*dt ){
            this.mouthOpen = !this.mouthOpen;  
        }

        if( (this.state == ActorState.Idle) & (!this.atTarget())){
            
            // start new jump towards target
            var dx = this.targetX-this.x  
            if( dx < -actorJumpDist ){
                dx = -actorJumpDist
            }
            if( dx > actorJumpDist ){
                dx = actorJumpDist
            }
            this.state = ActorState.Jumping;
            this.jumpPath = new JumpPath( this.x, this.x+dx, Math.abs(dx)/2 )
            
        } else if (this.state == ActorState.Jumping) {
            this.jumpPath.advance( dt );
            this.x = this.jumpPath.getX()
            if( this.jumpPath.done() ){
                this.state = ActorState.Idle;
                this.jumpPath = null;
                this.t = 0;
            }
        }
    }

}    