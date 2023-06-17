
class Actor {

      constructor(x) {
          this.x = x
          this.t = 0
          this.state = ActorState.Idle;
          this.targetX = x;
          this.jumpPath = null;
          
          this.shocked = false;
          this.eyesOpen = true;
          this.mouthOpen = true;
          this.jumpingFeetOffsets = this.getRandomJumpingFeetOffsets();
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

        if( (!this.shocked) & (this.state == ActorState.Idle) & (!this.atTarget())){
            
            // start new jump towards target
            this.startNewJump()
            
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
    
    startNewJump(h=null){
        // start new jump towards target
        var dx = this.targetX-this.x  
        var ajd = actorJumpDist*(1-Math.random()/2)
        if( dx < -ajd ){
            dx = -ajd
        }
        if( dx > ajd ){
            dx = ajd
        }
        this.state = ActorState.Jumping;
        if( !h ){
            h = Math.abs(dx)/2
        }
        this.jumpPath = new JumpPath( this.x, this.x+dx, h )
        this.jumpingFeetOffsets = this.getRandomJumpingFeetOffsets()
    }
    
    getRandomJumpingFeetOffsets(){
        var result = []
        for( var i = 0 ; i < 2 ; i++ ){
            result.push([])
            for( var j = 0 ; j < 2 ; j++ ){
                result[i].push([])
                for( var k = 0 ; k < 2 ; k++ ){
                    result[i][j].push(Math.random()-.5)
                }
            }
        }
        return result
    }

}    