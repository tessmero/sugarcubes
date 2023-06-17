

// Initialize the game
function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // Add event listeners
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("click", leftClick);
    canvas.addEventListener('contextmenu', rightClick);
    
    for( var i = 0 ; i < 10 ; i++ ){
        allActors.push(new Actor(getRandomX()));
    }
    currentChoreo = new RandomChoreo(allActors);
    
    // Start the game loop
    requestAnimationFrame(gameLoop);
}

// Main game loop
let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
    var msPassed = 0;
    if (oldTimeStamp) {
      msPassed = timeStamp - oldTimeStamp;
    }
    var secondsPassed = msPassed / 1000;
    oldTimeStamp = timeStamp;
    var fps = Math.round(1 / secondsPassed);


    msPassed = Math.min(msPassed,200)

    update(msPassed);
    draw(fps);

    requestAnimationFrame(gameLoop);
}


// Initialize the game
init();