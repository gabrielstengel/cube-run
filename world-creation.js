function addHero(){

	boat = new Boat();
	boat.mesh.scale.set(.015,.015,.015);
	boat.mesh.position.y = 100;
	//scene.add(boat.mesh);

	var sphereGeometry = new THREE.SphereGeometry( heroRadius, 32, 32 );
    var sphereMaterial = new THREE.MeshPhysicalMaterial( { color: Colors.red } )
	jumping=false;
	heroSphere = boat.mesh;//new THREE.Mesh( sphereGeometry, sphereMaterial );
	heroSphere.receiveShadow = true;
	heroSphere.castShadow=true;
	scene.add( heroSphere );
	heroSphere.position.y = heroBaseY;
	heroSphere.position.z = 4.8;
	currentLane=middleLane;
    heroSphere.position.x = currentLane;
    heroSphere.rotation.y = Math.PI / 2;
}
Sea = function(){
	var sides=40;
	var tiers=40;
	sphereGeometry = new THREE.CylinderGeometry( worldRadius, worldRadius, 100, 100,100);
	sphereGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-2*Math.PI/2));
	// create the material 
	var sphereMaterial = new THREE.MeshPhongMaterial({
		color:Colors.blue,
		transparent:true,
		opacity:.95,
		shading:THREE.FlatShading,
	});


	sphereGeometry.mergeVertices();

	// get the vertices
	var l = sphereGeometry.vertices.length;

	// create an array to store new data associated to each vertex
	this.waves = [];

	for (var i=0; i<l; i++){
		// get each vertex
		var v = sphereGeometry.vertices[i];

		// store some data associated to it
		this.waves.push({y:v.y,
										 x:v.x,
										 z:v.z,
										 // a random angle
										 ang:Math.random()*Math.PI*2,
										 // a random distance
										 amp:Math.random()/2,
										 // a random speed between 0.016 and 0.048 radians / frame
										 speed:0.016 + Math.random()*0.032
										});
	};
	
	this.rollingGroundSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	
	this.rollingGroundSphere .receiveShadow = true;
    this.rollingGroundSphere .castShadow=false;
    
	this.rollingGroundSphere .rotation.z=-Math.PI/2;
	scene.add( this.rollingGroundSphere  );
	this.rollingGroundSphere .position.y= -24;
	this.rollingGroundSphere .position.z=2;
	rollingGroundSphere  = this.rollingGroundSphere 


}

function createSea(){
	sea = new Sea();
}

Sea.prototype.moveWaves = function (){
	
	// get the vertices
	var verts = this.rollingGroundSphere.geometry.vertices;
	var l = verts.length;
	
	for (var i=0; i<l; i++){
		var v = verts[i];
		
		// get the data associated to it
		var vprops = this.waves[i];
		
		// update the position of the vertex
		v.z = vprops.z +  Math.sin(vprops.ang)*vprops.amp;
		v.y = vprops.y +(Math.cos(vprops.ang)*vprops.amp);

		// increment the angle for the next frame
		vprops.ang += vprops.speed;

	}

	// Tell the renderer that the geometry of the sea has changed.
	// In fact, in order to maintain the best level of performance, 
	// three.js caches the geometries and ignores any changes
	// unless we add this line
	this.rollingGroundSphere.verticesNeedUpdate=true;

	this.rollingGroundSphere.rotation.x += .005;
}



var hemisphereLight, shadowLight;

function addLight() {
	// an ambient light modifies the global color of a scene and makes the shadows softer
	ambientLight = new THREE.AmbientLight(0xdc8874, .5);
	scene.add(ambientLight);
	
	// A hemisphere light is a gradient colored light; 
	// the first parameter is the sky color, the second parameter is the ground color, 
	// the third parameter is the intensity of the light
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	
	
	// A directional light shines from a specific direction. 
	// It acts like the sun, that means that all the rays produced are parallel. 
	shadowLight = new THREE.DirectionalLight(0xffffff, .4);

	// Set the direction of the light  
	shadowLight.position.set(8 ,10,10 );
	
	// Allow shadow casting 
	shadowLight.castShadow = true;

	// define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// define the resolution of the shadow; the higher the better, 
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;
	
	// to activate the lights, just add them to the scene
	scene.add(hemisphereLight);  
	scene.add(shadowLight);
}