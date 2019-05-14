function addHero(){
	var sphereGeometry = new THREE.SphereGeometry( heroRadius, 32, 32 );
    var sphereMaterial = new THREE.MeshPhysicalMaterial( { color: Colors.blue } )
	jumping=false;
	heroSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	heroSphere.receiveShadow = true;
	heroSphere.castShadow=true;
	scene.add( heroSphere );
	heroSphere.position.y = heroBaseY;
	heroSphere.position.z = 4.8;
	currentLane=middleLane;
    heroSphere.position.x = currentLane;
    heroSphere.rotation.z = Math.PI / 2;
}
function addWorld(){
	var sides=40;
	var tiers=40;
	var sphereGeometry = new THREE.CylinderGeometry(600,600,800,40,10);
	sphereGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
	sphereGeometry.mergeVertices();
	// get the vertices
	var l = sphereGeometry.vertices.length;
	// create an array to store new data associated to each vertex
	waves = [];
	for (var i=0; i<l; i++){
		// get each vertex
		var v = sphereGeometry.vertices[i];

		// store some data associated to it
		waves.push({y:v.y,
										 x:v.x,
										 z:v.z,
										 // a random angle
										 ang:Math.random()*Math.PI*2,
										 // a random distance
										 amp:5 + Math.random()*15,
										 // a random speed between 0.016 and 0.048 radians / frame
										 speed:0.016 + Math.random()*0.032
										});
	};

	var mat = new THREE.MeshPhongMaterial({
		color:Colors.blue,
		transparent:true,
		opacity:.8,
		shading:THREE.FlatShading,
	});
	mesh = new THREE.Mesh(sphereGeometry, mat);
	mesh.receiveShadow = true;

	var sphereMaterial = new THREE.MeshPhysicalMaterial( { color: Colors.blue } )
	
	rollingGroundSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	rollingGroundSphere.receiveShadow = true;
    rollingGroundSphere.castShadow=false;
    
	rollingGroundSphere.rotation.z=-Math.PI/2;
	scene.add( rollingGroundSphere );
	rollingGroundSphere.position.y= -24;
	rollingGroundSphere.position.z=2;
	addWorldTrees();
	createSky();
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
	shadowLight.position.set( 8,60,-10 );
	
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