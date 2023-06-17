function updateMousePos(event){
    
    if( event ){
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;
        canvasMouseX = (event.clientX - rect.left) * scaleX;
        canvasMouseY = (event.clientY - rect.top) * scaleY;
    }    
    
}

function mouseMove(event) {
    updateMousePos(event)
}

function leftClick(event){
    updateMousePos(event)
}

function rightClick(event){
    updateMousePos(event)
    event.preventDefault();
}