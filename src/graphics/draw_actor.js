
// actor idle animation data
var all_specs = [
    [[0,.4,1,1,0],  [.2,1.4,.25],[.8,1.4,.25]],
    [[0,.2,1,1,-.2],[.1,1.2,.25],[.8,1.4,.25]],
    [[0,.2,1,1,-.2],[.1,1.2,.25],[.8,1.4,.25]],
    [[0,.4,1,1,0],  [.2,1.4,.25],[.8,1.4,.25]],
    [[0,.2,1,1,.2], [.2,1.4,.25],[.9,1.2,.25]],
    [[0,.2,1,1,.2], [.2,1.4,.25],[.9,1.2,.25]],
]        

// animation duration (ms)
var cp_dt = 500

// feet position in spec units
function getFootX( actor, foot_index ){
  var x = actor.jumpPath.t/actor.jumpPath.endT
  var k = .2
  var m = .3
  var result = (1.0-m) / 2 + m/(1+Math.exp(-(2*x-1)/k))
  
  var jfo = actor.jumpingFeetOffsets[foot_index]
  var dx = x*jfo[0][0] + (1.0-x)*jfo[0][1]
  
  if( actor.jumpPath.x1 < actor.jumpPath.x0 ){
    return .5 - (result-.5)
  }else if(actor.jumpPath.x1 == actor.jumpPath.x0){
    return (result + .5 - (result-.5))/2
  }
  return result + dx*.1;
}
function getFootY( actor, foot_index ){
  var x = actor.jumpPath.t/actor.jumpPath.endT
  
  var jfo = actor.jumpingFeetOffsets[foot_index]
  var dy = x*jfo[1][0] + (1.0-x)*jfo[1][1]
  return 1.4-.2*Math.sin(Math.PI*x) + dy*.1
}

function drawActor(actor){
    
    if( actor.shocked ){
        var prev_spec = all_specs[0]
        var next_spec = all_specs[0]
        var cp_r = 0
    } else if( actor.state!=ActorState.Jumping ){
        var cp_index = Math.floor( actor.t / cp_dt )
        var cp_r = (actor.t - (cp_index*cp_dt)) / cp_dt
       
        var prev_spec = all_specs[cp_index % all_specs.length]
        var next_spec = all_specs[(cp_index+1) % all_specs.length]
    } else {
        var prev_spec = all_specs[0]
    }
    
    for( var i = 0 ; i < prev_spec.length ; i++ ){
        if( actor.state!=ActorState.Jumping ){
            var interpRow = interpolateSpecRows(prev_spec[i],next_spec[i],cp_r)
        } else if( actor.state==ActorState.Jumping) {
            if( actor.jumpPath.x1 == actor.jumpPath.x0 ){
                var interpRow = all_specs[0][i]
            }else if( actor.jumpPath.x1 > actor.jumpPath.x0 ){
                var interpRow = all_specs[4][i]
            } else {
                var interpRow = all_specs[1][i]
            }
        }
        
        if( (i>0) & (actor.state==ActorState.Jumping) ){
            var dx = (i*2-3)/4 + (i-1)*.1*actor.jumpPath.t/actor.jumpPath.endT
            interpRow = [getFootX(actor, i-1)+dx, getFootY(actor, i-1), interpRow[2]]
        }
        
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'white'      
        drawSpecRow(interpRow, actor)  
       
        if( i == 0 ){
            ctx.strokeStyle = 'black'
            ctx.fillStyle = 'black'
            drawFace(interpRow, actor)  
        }
    }
    
    // draw precise location
    //ctx.fillStyle = 'red'           
    //ctx.beginPath()
    //ctx.arc( actor.x, y0 - actor.getY(), 4, 0, 2*Math.PI)
    //ctx.fill()
    
    // draw target location
    //ctx.fillStyle = 'blue'           
    //ctx.beginPath()
    //ctx.arc( actor.targetX, y0-4, 4, 0, 2*Math.PI)
    //ctx.fill()
}


       
function drawFace(row, actor){
   
    var m = actorSize
    var x = actor.x + m*row[0]-actorSize/2
    var y = y0 - actor.getY() + m*row[1]-3*actorSize/2
    var w = m*row[2]
    var h = m*row[3]
    var ox = m*row[4];
   
    // start clipping
    ctx.save()
    ctx.rect(x,y,w,h)
    ctx.clip()
   
    if( actor.shocked ){
        
        
        // draw shocked mouth
        ctx.beginPath()
        ctx.arc( x+w/2+ox, y+h/2, w/4,  0, 2*Math.PI)
        ctx.fill()
        
        // draw shocked eyes     
        ctx.beginPath()
        ctx.arc( x+w/4+ox, y+h/5, w/10, 0, 2*Math.PI)
        ctx.fill()
        ctx.beginPath()
        ctx.arc( x+3*w/4+ox, y+h/5, w/10, 0, 2*Math.PI)
        ctx.fill()
        
    } else {
        
        // draw idle mouth
        if( actor.mouthOpen ){
            ctx.beginPath()
            ctx.arc( x+w/2+ox, y+h/3, w/3, 0.1*Math.PI, 0.9*Math.PI )
            ctx.fill()
        } else {
            ctx.beginPath()
            ctx.arc( x+w/2+ox, y, w/2, 0.3*Math.PI, 0.7*Math.PI )
            ctx.stroke()
        }
        
        // draw idle eyes
        if( actor.eyesOpen ){                
            ctx.beginPath()
            ctx.arc( x+w/4+ox, y+h/5, w/10, 0, 2*Math.PI)
            ctx.fill()
            ctx.beginPath()
            ctx.arc( x+3*w/4+ox, y+h/5, w/10, 0, 2*Math.PI)
            ctx.fill()
        } else {
            ctx.beginPath()
            ctx.arc( x+w/4+ox, y+h/3, w/6, 1.25*Math.PI, 1.75*Math.PI)
            ctx.stroke()
            ctx.beginPath()
            ctx.arc( x+3*w/4+ox, y+h/3, w/6, 1.25*Math.PI, 1.75*Math.PI)
            ctx.stroke()
        }
    }
   
   
    // stop clipping
    ctx.restore()
}

function drawSpecRow(row, actor){
    var m = actorSize
    
    var x = actor.x + m*row[0]-actorSize/2
    var y = y0 - actor.getY() + m*row[1]-3*actorSize/2
   
    if( row.length >= 4){
        ctx.fillRect( x, y, m*row[2], m*row[3] )
        ctx.strokeRect( x, y, m*row[2], m*row[3] )
    } else if( row.length == 3 ){
        var a = Math.PI/6
        ctx.beginPath()
        ctx.arc( x, y, m*row[2], Math.PI-a, a, false)
        ctx.fill()
        ctx.beginPath()
        ctx.arc( x, y, m*row[2], Math.PI-a, a, false)
        ctx.closePath()
        ctx.stroke()
    }
}


       
function interpolateSpecRows(a,b,r){
    if( r == 0 ){
        return a;  
    } else if( r == 1){
        return b  
    } else {
        var result = []
        for( var i = 0 ; i < a.length ; i++ ){
            result[i] = a[i]*(1.0-r) + b[i]*r  
        }
        return result
    }
}