

function createScene(){
	hasCollided=false;
	score=0;
	treesInPath=[];
	treesPool=[];
	clock=new THREE.Clock();
	clock.start();
	heroRollingSpeed=(rollingSpeed*worldRadius/heroRadius)/5;
	sphericalHelper = new THREE.Spherical();
	pathAngleValues=[1.52,1.57,1.62];
    sceneWidth=window.innerWidth;
    sceneHeight=window.innerHeight;
    scene = new THREE.Scene();//the 3d scene
    //scene.fog = new THREE.FogExp2( 0xf0fff0, 0.05 );
    camera = new THREE.PerspectiveCamera( 60, sceneWidth / sceneHeight, 0.1, 1000 );//perspective camera
    renderer = new THREE.WebGLRenderer({alpha:true});//renderer with transparent backdrop
    renderer.setClearColor(0xfffafa, 1); 
    renderer.shadowMap.enabled = true;//enable shadow
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( sceneWidth, sceneHeight );
    dom = document.getElementById('world');
	dom.appendChild(renderer.domElement);
	//stats = new Stats();
	//dom.appendChild(stats.dom);

	
	createTreesPool();
	createSea();
	addWorldTrees();
	createSky();
	addHero();
	createSky();
	addLight();
	addExplosion();
	
	camera.position.z = 10.5;
	camera.position.y = 4.5;
	/*/orbitControl = new THREE.OrbitControls( camera, renderer.domElement );//helper to rotate around in scene
	orbitControl.addEventListener( 'change', render );
	orbitControl.noKeys = true;
	orbitControl.noPan = true;
	orbitControl.enableZoom = false;
	orbitControl.minPolarAngle = 1.1;
	orbitControl.maxPolarAngle = 1.1;
	orbitControl.minAzimuthAngle = -0.2;
	orbitControl.maxAzimuthAngle = 0.2;
	
	*/
	window.addEventListener('resize', onWindowResize, false);//resize callback

	document.onkeydown = handleKeyDown;
}


function addExplosion(){
	particleGeometry = new THREE.Geometry();
	for (var i = 0; i < particleCount; i ++ ) {
		var vertex = new THREE.Vector3();
		particleGeometry.vertices.push( vertex );
	}
	var pMaterial = new THREE.ParticleBasicMaterial({
	  color: Colors.brownDark,
	  size: 0.3
	});
	particles = new THREE.Points( particleGeometry, pMaterial );
	scene.add( particles );
	particles.visible=false;
}
