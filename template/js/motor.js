/**
 * Combining PIXI.js and THREE.js in one <canvas> Element
 *
 * Check the DOM, There's just one!
 *
 * The rotating image on top is just a PIXI Sprite to show that PIXI is present, ;-)
 *
 * Thanx and respect to Luigi Mannoni for the awesome THREE WebGL Tunnel
 * I've changed almost nothing. Only added some PIXI things in your THREE scene function
 * @see the original at: https://codepen.io/luigimannoni/pen/bdPVVz
 */

// Setup a PIXI stage and add it (canvas element) to the DOM
// settings don't really matter for the combi, only the dimensions

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

this.app = new PIXI.Application(window.innerWidth, window.innerHeight, {
  //backgroundColor   : 0x000000,
  //transparent       : true,
  //resolution		  : 1,
  antialias: false,
  legacy: true,
  clearBeforeRender: true,
  autoResize: true,
  powerPreference: "high-performance"
});
document.body.appendChild(this.app.view);

// Set up the THREE scene that will be 'integrated' in PIXI.JS

function deg2rad(_degrees) {
  return (_degrees * Math.PI) / 180;
}
var mouseX = 0;
var mouseY = 0;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// setup THREE WebGL renderer
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);

/**
 * For the combi to work with only one <canvas> element,
 * Do not add the THREE <canvas> element to the DOM
 *
 *	document.body.appendChild(renderer.domElement);   // Leave this out!
 *
 */

var time = new THREE.Clock();

/**
 * Here comes PIXI again:
 * Creating a PIXI.BaseTexture from the THREE scene
 *
 * 'renderer.domElement' is the what would normally be added by THREE as/in a <canvas> to the DOM
 */
var THREE_TEXTURE = PIXI.BaseTexture.from(
  renderer.domElement,
  PIXI.SCALE_MODES.LINEAR
);
var THREE_SPRITE = new PIXI.Sprite.from(new PIXI.Texture(THREE_TEXTURE));
this.app.stage.addChild(THREE_SPRITE);

// Adding just some PIXI sprite based on the same image the Tunnel is based on:
// (animating it later on a little)

// Then a requestAnimationFrame function, that will loop.... forever
// Inside THREE does its thing, animating the WebGL tunnel
// And because of PIXI's `RIDE THE LIGHTNING` SPEED .. it (PIXI) captures THREE's changes every frame, 60 times a second, and....

//Variables de Esteban y Alejandro

var motor = [];

function crearObjeto(obj) {
  var newObj = new obj();

  motor.push(newObj);
  return newObj;
}

var tiempo = 0;

var render = function() {
  // First THREE

  // THREE Renders (updates its scene) at 60 FPS
  draw();
  renderer.clear();
  renderer.render(scene, camera);
  tiempo += 1;

  /**
   * And here is it,
   * one simple short magic piece of code
   * PIXI updates the created BaseTexture every Frame, at 60 FPS
   */
  THREE_TEXTURE.update();

  // animate the PIXI Sprite image a little

  // making the Render function loop
  requestAnimationFrame(render);
};

render(); // init the render (requestAnimationFrame) function

// Then some mouse and resize events
// These will remain to work, because PIXI renders and captures every move THREE makes

document.addEventListener("mousemove", onDocumentMouseMove, false);
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  var vw = window.innerWidth;
  var vh = window.innerHeight;

  camera.aspect = vw / vh;
  camera.updateProjectionMatrix();
  renderer.setSize(vw, vh);

  // Resizing for PIXI
  this.app.renderer.resize(vw, vh);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - window.innerWidth / 2;
  mouseY = event.clientY - window.innerHeight / 2;
}

// That's it!!!
