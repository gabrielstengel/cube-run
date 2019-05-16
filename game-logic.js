

// GAME LOGIC
function update(){
	//stats.update();
    //animate
    rollingGroundSphere.rotation.x += rollingSpeed;
    //heroSphere.rotation.x -= heroRollingSpeed;
    sky.mesh.position.x += 0.1;
    if(heroSphere.position.y<=heroBaseY){
    	
        
        if (jumping == true) {
            bigSplash(); }
        else  {
            splash();
        }
        bounceValue=(Math.random()*0.04)+0.005;
        jumping=false;
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
    doSplashLogic();
    doBigSplashLogic();
    ballCol();
    sea.moveWaves();
}

function GameLoop(){
    

    requestAnimationFrame(GameLoop);
    update();
    render();
}