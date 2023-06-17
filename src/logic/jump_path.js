class JumpPath {

  constructor( x0, x1, h ) {
    this.x0 = x0;
    this.x1 = x1;
    this.h = h;
    this.t = 0;
    this.endT = Math.abs(x1-x0)/actorXSpeed;
  }
  
  advance(dt){
      this.t += dt;
  }
  
  getX(){
    return this.x0 + (this.x1 - this.x0) * (this.t/this.endT)
  }
  
  getY(){
    var t = (this.t/this.endT)
    return this.h * (4*t - 4*Math.pow(t,2));
  }
  
  done(){
    return this.t >= this.endT;
  }
}