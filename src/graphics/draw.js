
// Render graphics


// get a modified version of the given color
// based on global colorLevel
function getWhitenedColor( r,g,b ){
    r = 255*(1.0-colorLevel) + r*(colorLevel)
    g = 255*(1.0-colorLevel) + g*(colorLevel)
    b = 255*(1.0-colorLevel) + b*(colorLevel)
    return `rgb(${r},${g},${b})`
}

function draw(fps) {
    // draw sky
    ctx.fillStyle = getWhitenedColor(135,206,235)
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw invironment
    if( gameState == GameState.Sunny ){
        drawSun()
    }

    // draw actors
    for (var i = 0 ; i < allActors.length ; i++ ){
        drawActor( allActors[i] );
    }

    // draw ground
    ctx.fillStyle = getWhitenedColor(0,154,23)
    console.log(ctx.fillStyle )
    ctx.strokeStyle = 'black'
    ctx.fillRect( 0, y0, canvas.width, canvas.height)
    ctx.strokeRect( 0, y0, canvas.width, canvas.height)
    
    // draw click prompt
    if( (gameState==GameState.ReadyForFirstClick) | (gameState==GameState.ReadyForSecondClick) ){
        ctx.font = "25px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("Click Here", canvas.width/2, canvas.height/3);
    }
    

    // Draw FPS on the screen
    //ctx.font = "25px Arial";
    //ctx.textAlign = "left";
    //ctx.fillStyle = "black";
    //var x = 10
    //var y = 30
    //ctx.fillText("FPS: " + fps, x, y);
    
    //y += 30
    //ctx.fillText(`camera: ${cameraX.toFixed(2)}, ${cameraY.toFixed(2)}, ${zoomLevel.toFixed(2)}`, x, y);
    //y += 30
    //ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}