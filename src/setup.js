

// Initialize the game
function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // Add event listeners
    canvas.addEventListener("click", leftClick);
    
    // init actors
    for( var i = 0 ; i < 10 ; i++ ){
        var a = new Actor(getRandomX()-canvas.width)
        a.targetX = getRandomX();
        allActors.push(a);
    }
    currentChoreo = new RandomChoreo(allActors);
    
    // init env
    sunY = canvas.height+sunRadius;
    minSunY = canvas.height/4

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