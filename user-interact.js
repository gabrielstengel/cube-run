function handleKeyDown(keyEvent){

	//if(jumping)return;
	var validMove=true;
   
	if (jumping == true) return;
		if ( keyEvent.keyCode === 32){//up, jump
			bounceValue=0.2;
			jumping=true;
		}
		 else {validMove=false;}

}


var mousePos={x:0, y:0};

// now handle the mousemove event

function handleMouseMove(event) {

	// here we are converting the mouse position value received 
	// to a normalized value varying between -1 and 1;
	// this is the formula for the horizontal axis:
	
	var tx = -1 + (event.clientX / sceneWidth)*2;

	// for the vertical axis, we need to inverse the formula 
	// because the 2D y-axis goes the opposite direction of the 3D y-axis
	
	var ty = 1 - (event.clientY / sceneHeight)*2;
	mousePos = {x:tx, y:ty};

}

function updateHero(){

	// let's move the airplane between -100 and 100 on the horizontal axis, 
	// and between 25 and 175 on the vertical axis,
	// depending on the mouse position which ranges between -1 and 1 on both axes;
	// to achieve that we use a normalize function (see below)
	
	var targetX = normalize(mousePos.x, -1, 1, -3, 3);
	

	// update the airplane's positions

	heroSphere.position.x += (targetX - heroSphere.position.x)*0.1;
	
	

	// Rotate the plane proportionally to the remaining distance
	heroSphere.rotation.y = Math.PI / 2 - .3*(targetX-heroSphere.position.x);
	//airplane.mesh.rotation.x = (airplane.mesh.position.y-targetY)*0.0064;

	var targetY = heroSphere.position.y + bounceValue;
	heroSphere.rotation.z = Math.PI / 10 + 3.5*(targetY-heroSphere.position.y);
	//console.log(heroSphere.rotation.z );
	
    
	
	
}

function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}