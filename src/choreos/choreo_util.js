
  
function getRandomX(){
  var m = actorSize*2;
  return m + Math.random() * (canvas.width-2*m);
}

var nudgeSpeed = .001; //pixels per ms
function nudgeOverlappingActors(actors,dt){
    for( var i = 0 ; i < actors.length ; i++ ){
        if( actors[i].atTarget() ){
            for( var j = 0 ; j < i ; j++ ){
                if( actors[j].atTarget() ){
                    var dx = actors[j].x-actors[i].x
                    if( Math.abs(dx) < actorSize*1.2 ){
                        var m = nudgeSpeed * dt
                        actors[i].x -= dx*m
                        actors[i].targetX = actors[i].x
                        actors[j].x += dx*m
                        actors[j].targetX = actors[j].x
                    }
                }
            }
        }
    }
}