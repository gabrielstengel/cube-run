

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
    if (game.status=="playing"){
        doTreeLogic();
    }
    if (game.status=="waitingReplay"){
        console.log("here?");
        document.onkeydown = function (e) {
        switch (e.key) {
            case 'ArrowDown':
                resetgame();
            }
        };
    }
    doExplosionLogic();
    doSplashLogic();
    doBigSplashLogic();
    ballCol();
    sea.moveWaves();
}

function resetgame(event){
    resettext.innerHTML = "collect as many coins as you can in 20 seconds";
    createMenu();
    coins.innerHTML = game.coins;
    game.status == "playing"
    time = new THREE.Clock(true);
    time.start();
    updateTime();
}


function updateTime(){
    if (time.getElapsedTime() >= 20) {
       game.status = "waitingReplay";
       resettext.innerHTML = "your score is <span class='coincount'>" + game.coins + "</span>. click the down key to restart";
    }
    timeleft.style.right = 5*(20-time.getElapsedTime())+"%";

}

function GameLoop(){
    requestAnimationFrame(GameLoop);
    update();
    render();
}