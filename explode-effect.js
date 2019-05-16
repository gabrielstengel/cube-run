function doExplosionLogic(){
	if(!particles.visible)return;
	for (var i = 0; i < particleCount; i ++ ) {
		particleGeometry.vertices[i].multiplyScalar(explosionPower);
	}
	if(explosionPower>1.005){
		explosionPower-=0.001;
	}else{
		particles.visible=false;
	}
	particleGeometry.verticesNeedUpdate = true;
}
function explode(){
	particles.position.y=2;
	particles.position.z=4.8;
	particles.position.x=heroSphere.position.x;
	for (var i = 0; i < particleCount; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = -0.2+Math.random() * 0.4;
		vertex.y = -0.2+Math.random() * 0.4 ;
		vertex.z = -0.2+Math.random() * 0.4;
		particleGeometry.vertices[i]=vertex;
	}
	explosionPower=1.12;
	particles.visible=true;
}

function splash(){
	splash_particles.position.y=2;
	splash_particles.position.z=4.8;
	splash_particles.position.x=heroSphere.position.x;
	for (var i = 0; i < splash_particleCount; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = -0.2+Math.random() * 0.4;
		vertex.y = -0.2+Math.random() * 0.4 ;
		vertex.z = -0.2+Math.random() * 0.4;
		splash_particleGeometry.vertices[i]=vertex;
	}
	splash_power=1.2;
	splash_particles.visible=true;
}

function doSplashLogic(){
	if(!splash_particles.visible)return;
	for (var i = 0; i < splash_particleCount; i ++ ) {
		splash_particleGeometry.vertices[i].multiplyScalar(splash_power);
	}
	if(splash_power>1.0){
		splash_power-=0.01;
	}else{
		splash_particles.visible=false;
	}
	splash_particleGeometry.verticesNeedUpdate = true;
}


function bigSplash(){
	bigsplash_particles.position.y=2;
	bigsplash_particles.position.z=4.8;
	bigsplash_particles.position.x=heroSphere.position.x;
	for (var i = 0; i < bigsplash_particleCount; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = -0.2+Math.random() * 0.4;
		vertex.y = -0.2+Math.random() * 0.4 ;
		vertex.z = -0.2+Math.random() * 0.4;
		bigsplash_particleGeometry.vertices[i]=vertex;
	}
	bigsplash_power=1.2;
	bigsplash_particles.visible=true;
}

function doBigSplashLogic(){
	if(!bigsplash_particles.visible)return;
	for (var i = 0; i < bigsplash_particleCount; i ++ ) {
		bigsplash_particleGeometry.vertices[i].multiplyScalar(bigsplash_power);
	}
	if(bigsplash_power > 1.0){
		bigsplash_power-=0.001;
	}else{
		bigsplash_particles.visible=false;
	}
	bigsplash_particleGeometry.verticesNeedUpdate = true;
}
