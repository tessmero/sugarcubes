

// Update game logic
function update(dt) {
    
    // advance game clock
    gameTime += dt
    if( (gameState==GameState.Start) & (gameTime>10000) ){
        gameState = GameState.ReadyForFirstClick
    }
    
    // update dance sequence
    if( currentChoreo ) {
        currentChoreo.update(dt)
    }
    
    // update actors
    for (var i = 0 ; i < allActors.length ; i++ ){
        allActors[i].update(dt);
    }
    
    // update environment
    if( gameState == GameState.Sunny ){
        if( sunY > minSunY ){
            sunY  = Math.max( minSunY, sunY-sunSpeed*dt )
        }
        
        if( (colorLevel < 1) & (sunY < 400) ){
            colorLevel = Math.min( 1, colorLevel+colorUpSpeed*dt )
        }
    }
}