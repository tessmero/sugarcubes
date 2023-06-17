class ActorState {
  static Jumping = new ActorState('Jumping');
  static Idle = new ActorState('Idle');

  constructor(name) {
    this.name = name;
  }
  
  toString(){
    return this.name;
  }
}