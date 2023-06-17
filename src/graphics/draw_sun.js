function drawSun(){
    ctx.fillStyle = 'yellow'
    ctx.beginPath();
    ctx.arc( canvas.width/2, sunY, sunRadius, 0, Math.PI*2 )
    ctx.fill()
}