/**
 * @author mr.doob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 */

THREE.Camera = function( fov, aspect, near, far, target ) {

	THREE.Object3D.call( this );

	this.fov = fov || 50;
	this.aspect = aspect || 1.0;
	this.near = near || 0.1;
	this.far = far || 2000;

	// this.screenCenterX = 0;
	// this.screenCenterY = 0;

	this.target = target || new THREE.Object3D();
	this.useTarget = true;

	this.up = new THREE.Vector3( 0, 1, 0 );

	this.matrixWorldInverse = new THREE.Matrix4();
	this.projectionMatrix   = null;

	// movement

	this.tmpVec = new THREE.Vector3();

	this.translateX = function ( amount, noFly ) {

		this.tmpVec.sub( this.target.position, this.position ).normalize().multiplyScalar( amount );
		this.tmpVec.crossSelf( this.up );

		if ( noFly ) this.tmpVec.y = 0;

		this.position.addSelf( this.tmpVec );
		this.target.position.addSelf( this.tmpVec );

	};

	/* TODO
	this.translateY = function ( amount ) {

	};
	*/

	this.translateZ = function ( amount, noFly ) {

		this.tmpVec.sub( this.target.position, this.position ).normalize().multiplyScalar( amount );

		if ( noFly ) this.tmpVec.y = 0;

		this.position.subSelf( this.tmpVec );
		this.target.position.subSelf( this.tmpVec );

	};

	this.updateProjectionMatrix();

}

THREE.Camera.prototype = new THREE.Object3D();
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.supr = THREE.Object3D.prototype;


/*
 * Update projection matrix
 *
 * TODO: make it work also for ortho camera
*/

THREE.Camera.prototype.updateProjectionMatrix = function() {

	this.projectionMatrix = THREE.Matrix4.makePerspective( this.fov, this.aspect, this.near, this.far );

}


/*
 * Update
 */

THREE.Camera.prototype.update = function( parentMatrixWorld, forceUpdate, camera ) {

	if( this.useTarget ) {

		// local

		this.matrix.lookAt( this.position, this.target.position, this.up );


		// global

		if( parentMatrixWorld ) {

			this.matrixWorld.multiply( parentMatrixWorld, this.matrix );

		} else {

			this.matrixWorld.copy( this.matrix );

		}

		THREE.Matrix4.makeInvert( this.matrixWorld, this.matrixWorldInverse );

		forceUpdate = true;

	} else {

		if( this.matrixAutoUpdate )
			forceUpdate |= this.updateMatrix();

		if( forceUpdate || this.matrixNeedsUpdate ) {

			if( parentMatrixWorld ) {

				this.matrixWorld.multiply( parentMatrixWorld, this.matrix );

			} else {

				this.matrixWorld.copy( this.matrix );

			}

			this.matrixNeedsUpdate = false;
			forceUpdate            = true;

			THREE.Matrix4.makeInvert( this.matrixWorld, this.matrixWorldInverse );

		}

	}

	// update children

	for ( var i = 0; i < this.children.length; i++ ) {

		this.children[ i ].update( this.matrixWorld, forceUpdate, camera );

	}

};

/*
 * FrustumContains
 * Checks object against projected image (as opposed to ordinary 3D frustum check)
 *
 * TODO: make it work also for ortho camera
 */

/*
THREE.Camera.prototype.frustumContains = function( object3D ) {

	// object pos

	var vx0 = object3D.matrixWorld.n14,
	vy0 = object3D.matrixWorld.n24,
	vz0 = object3D.matrixWorld.n34;

	// check z

	var inverse = this.matrixWorldInverse;
	var radius = object3D.boundRadius * object3D.boundRadiusScale;
	var vz1 = ( inverse.n31 * vx0 + inverse.n32 * vy0 + inverse.n33 * vz0 + inverse.n34 );

	if( vz1 - radius > - this.near ) {

		return false;

	}

	if( vz1 + radius < - this.far ) {

		return false;

	}

	// check x

	vz1 -= radius;

	var perspective      = this.projectionMatrix;
	var ooZ              = 1 / ( perspective.n43 * vz1 );
	var ooZscreenCenterX = ooZ * this.screenCenterX;
	var vx1              = ( inverse.n11 * vx0 + inverse.n12 * vy0 + inverse.n13 * vz0 + inverse.n14 ) * perspective.n11 * ooZscreenCenterX;
	radius               = perspective.n11 * radius * ooZscreenCenterX;

	if( vx1 + radius < -this.screenCenterX )
		return false;

	if( vx1 - radius > this.screenCenterX )
		return false;


	// check y

	var vy1 = ( inverse.n21 * vx0 + inverse.n22 * vy0 + inverse.n23 * vz0 + inverse.n24 ) * perspective.n22 * ooZ * this.screenCenterY;

	if( vy1 + radius < -this.screenCenterY )
		return false;

	if( vy1 - radius > this.screenCenterY )
		return false;


	// inside

	object3D.positionScreen.set( vx1, vy1, vz1, radius );

	return true;

};
*/
