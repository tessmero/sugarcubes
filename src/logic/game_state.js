class GameState {
  static Start = new GameState('StartMenu');
  static ReadyFirstClick = new GameState('ReadyFirstClick');
  static Sunny = new GameState('Sunny');
  static ReadyForSecondClick = new GameState('ReadyForSecondClick');

  constructor(name,dx,dy) {
    this.name = name;
  }
  
  toString(){
    return this.name;
  }
}