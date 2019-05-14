// GAME VARIABLES
var game;
var deltaTime = 0;
var newTime = new Date().getTime();
var oldTime = new Date().getTime();
var ennemiesPool = [];
var particlesPool = [];
var particlesInUse = [];


// GAME LOGIC
function update(){
	//stats.update();
    //animate
    rollingGroundSphere.rotation.x += rollingSpeed;
    heroSphere.rotation.x -= heroRollingSpeed;
    if(heroSphere.position.y<=heroBaseY){
    	jumping=false;
    	bounceValue=(Math.random()*0.04)+0.005;
    }

    heroSphere.position.y+=bounceValue;
    
    bounceValue-=gravity;

    if(clock.getElapsedTime()>treeReleaseInterval){
    	clock.start();
    	addPathTree();
    	if(!hasCollided){
			score+=2*treeReleaseInterval;
		}
    }

    updateHero();
    doTreeLogic();
    doExplosionLogic();
    ballCol();
}

function GameLoop(){
    
    requestAnimationFrame(GameLoop);
    update();
    render();
}