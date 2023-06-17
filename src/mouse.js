
function leftClick(event){
    if( gameState == GameState.ReadyForFirstClick ){
        gameState = GameState.Sunny
        currentChoreo = new SunupChoreo(allActors)
    }
}