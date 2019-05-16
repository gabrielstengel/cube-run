
var sceneWidth;
var sceneHeight;
var camera;
var scene;
var renderer;
var dom;
var sun;
var ground;


//var orbitControl;
var rollingGroundSphere;
var heroSphere;
var rollingSpeed=0.008;
var heroRollingSpeed;
var worldRadius=26;
var heroRadius=0.4;
var sphericalHelper;
var pathAngleValues;
var heroBaseY=2;
var bounceValue=0.3;
var gravity=0.005 ;
var leftLane=-1;
var rightLane=1;
var middleLane=0;
var currentLane;
var clock;
var jumping;
var treeReleaseInterval=0.5;
var lastTreeReleaseTime=0;
var treesInPath;
var treesPool;
var particleGeometry;
var particleCount=20;
var explosionPower =1.06;
var particles;


//var stats;
var scoreText;
var score;
var hasCollided;
var sea;
var coins;
var time = new THREE.Clock(true);
time.start();
var resettext;

function init() {
	document.addEventListener('mousemove', handleMouseMove, false);
	 moonLanding = new Date('July 20, 69 00:20:18 GMT+00:00');
	coins = document.getElementById("distValue");
	timeleft = document.getElementById("energyBar");
	resettext = document.getElementById("instructions");
	createScene();
	GameLoop();
}

// DRAW SCENE
function render(){
    renderer.render(scene, camera);
}

function onWindowResize() {
	//resize & align
	sceneHeight = window.innerHeight;
	sceneWidth = window.innerWidth;
	renderer.setSize(sceneWidth, sceneHeight);
	camera.aspect = sceneWidth/sceneHeight;
	camera.updateProjectionMatrix();
}

