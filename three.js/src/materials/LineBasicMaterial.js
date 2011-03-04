/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 
 *  linewidth: <float>,
 *  linecap: "round",  
 *  linejoin: "round",
 
 *  vertexColors: <bool>
 * }
 */

THREE.LineBasicMaterial = function ( parameters ) {

	this.id = THREE.MaterialCounter.value ++;

	this.color = new THREE.Color( 0xffffff );
	this.opacity = 1.0;

	this.blending = THREE.NormalBlending;
	this.depthTest = true;

	this.linewidth = 1.0;
	this.linecap = 'round'; // implemented just in CanvasRenderer
	this.linejoin = 'round'; // implemented just in CanvasRenderer

	this.vertexColors = false;

	if ( parameters ) {

		if ( parameters.color !== undefined ) this.color.setHex( parameters.color );
		if ( parameters.opacity !== undefined ) this.opacity  = parameters.opacity;

		if ( parameters.blending !== undefined ) this.blending = parameters.blending;
		if ( parameters.depthTest !== undefined ) this.depthTest = parameters.depthTest;

		if ( parameters.linewidth !== undefined ) this.linewidth = parameters.linewidth;
		if ( parameters.linecap !== undefined ) this.linecap = parameters.linecap;
		if ( parameters.linejoin !== undefined ) this.linejoin = parameters.linejoin;

		if ( parameters.vertexColors !== undefined ) this.vertexColors = parameters.vertexColors;

	}

};
