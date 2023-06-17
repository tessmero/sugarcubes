
// graphics context
var canvas;
var ctx;
var y0 = 400; // canvas y value to be considered y=0 in game coords

var canvasMouseX = null;
var canvasMouseY = null;


// src/core/game_state.js
var gameState = GameState.StartMenu;
var startMenuSim = null;

// game settings
var actorXSpeed = .1; //pixels per ms
var actorXTolerance = 10; //(pixels) allowed error in positioning
var actorSize = 20; //pixels
var actorJumpDist = 100; //(pixels) maximum x-distance for one jump

var allActors = []
var currentChoreo = null;