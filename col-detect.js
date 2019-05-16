function doTreeLogic(){
	if (game.status == "playing") {
		updateTime();
	}
	var oneTree;
	var treePos = new THREE.Vector3();
	var treesToRemove=[];

	treesInPath.forEach( function ( element, index ) {
		oneTree=treesInPath[ index ];
		treePos.setFromMatrixPosition( oneTree.matrixWorld );

		//oneTree.position.y -=  2*Math.sin(0.05*new Date().getTime())  ;

		if(treePos.z>6 &&oneTree.visible){//gone out of our view zone
			treesToRemove.push(oneTree);
		}else{
			//check collision
			if(treePos.distanceTo(heroSphere.position)<=0.9){
				hasCollided=true;
				treesToRemove.push(oneTree);
				explode();
				if (game.status == "playing") {
					addCoin();
				}
			}
		}
	});

	var fromWhere;
	treesToRemove.forEach( function ( element, index ) {
		oneTree=treesToRemove[ index ];
		fromWhere=treesInPath.indexOf(oneTree);
		treesInPath.splice(fromWhere,1);
		treesPool.push(oneTree);
		oneTree.visible=false;

		console.log("remove tree");
	});

	
}

function addCoin() {
	game.coins += 1;
	coins.innerHTML = game.coins;
}

function ballCol() {
	if (heroSphere.position.distanceToSquared(rollingGroundSphere) < heroRadius + worldRadius) {
        console.log("ball following below");
	}
}