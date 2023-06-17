
// Render graphics
function draw(fps) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw actors
    for (var i = 0 ; i < allActors.length ; i++ ){
        drawActor( allActors[i] );
    }

    // draw ground
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.fillRect( 0, y0, canvas.width, canvas.height)
    ctx.strokeRect( 0, y0, canvas.width, canvas.height)

    // Draw FPS on the screen
    ctx.font = "25px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "black";
    var x = 10
    var y = 30
    ctx.fillText("FPS: " + fps, x, y);
    
    //y += 30
    //ctx.fillText(`camera: ${cameraX.toFixed(2)}, ${cameraY.toFixed(2)}, ${zoomLevel.toFixed(2)}`, x, y);
    //y += 30
    //ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}