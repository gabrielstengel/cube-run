function init(event){

  // UI

  fieldDistance = document.getElementById("distValue");
  energyBar = document.getElementById("energyBar");
  replayMessage = document.getElementById("replayMessage");
  fieldLevel = document.getElementById("levelValue");
  levelCircle = document.getElementById("levelCircleStroke");

  resetGame();
  createScene();

  createLights();
  createPlane();
  createSea();
  createSky();
  createCoins();
  createEnnemies();
  createParticles();

  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  document.addEventListener('mouseup', handleMouseUp, false);
  document.addEventListener('touchend', handleTouchEnd, false);

  loop();
}