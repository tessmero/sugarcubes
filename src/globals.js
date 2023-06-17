
// graphics context
var canvas;
var ctx;
var y0 = 400; // canvas y value to be considered y=0 in game coords

var canvasMouseX = null;
var canvasMouseY = null;


// src/core/game_state.js
var gameState = GameState.Start;
var gameTime = 0;

// game settings
var actorXSpeed = .2; //pixels per ms
var actorXTolerance = 10; //(pixels) allowed error in positioning
var actorSize = 30; //pixels
var actorJumpDist = 300; //(pixels) maximum x-distance for one jump

var allActors = []
var currentChoreo = null;

// environment animation
var sunRadius = 50;
var sunY;
var minSunY;
var sunSpeed = .2; //pixels per ms
var colorLevel = 0;
var colorUpSpeed = .001; // fraction per ms