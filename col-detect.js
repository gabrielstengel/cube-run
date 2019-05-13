function doTreeLogic(){
	var oneTree;
	var treePos = new THREE.Vector3();
	var treesToRemove=[];

	treesInPath.forEach( function ( element, index ) {
		oneTree=treesInPath[ index ];
		treePos.setFromMatrixPosition( oneTree.matrixWorld );
		if(treePos.z>6 &&oneTree.visible){//gone out of our view zone
			treesToRemove.push(oneTree);
		}else{
			//check collision
			if(treePos.distanceTo(heroSphere.position)<=0.6){
				console.log("hit");
				hasCollided=true;
				explode();
				gameOver();
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


function ballCol() {
	if (heroSphere.position.distanceToSquared(rollingGroundSphere) < heroRadius + worldRadius) {
        console.log("ball following below");
	}
}