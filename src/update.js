

// Update game logic
function update(dt) {
    
    // update dance sequence
    if( currentChoreo ) {
        currentChoreo.update(dt)
    }
    
    // update actors
    for (var i = 0 ; i < allActors.length ; i++ ){
        allActors[i].update(dt);
    }
    
}