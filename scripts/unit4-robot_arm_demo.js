////////////////////////////////////////////////////////////////////////////////
// Basic robot arm: forearm and upper arm
////////////////////////////////////////////////////////////////////////////////

/*global THREE, Coordinates, $, document, window, dat*/

var camera, scene, renderer;
var cameraControls, effectController;
var clock = new THREE.Clock();
var gridX = false;
var gridY = false;
var gridZ = false;
var axes = true;
var ground = false;
var arm, forearm;

function fillScene() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

	// LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x222222 );

	var light = new THREE.DirectionalLight( 0xffffff, 1.0 );
	light.position.set( 200, -400, 500 );
	
	var light2 = new THREE.DirectionalLight( 0xffffff, 1.0 );
	light2.position.set( 73, 184, 184 );

	scene.add(ambientLight);
	scene.add(light);
	scene.add(light2);

	if (ground) {
		Coordinates.drawGround({size:10000});		
	}
	if (gridX) {
		Coordinates.drawGrid({size:10000,scale:0.01});
	}
	if (gridY) {
		Coordinates.drawGrid({size:10000,scale:0.01, orientation:"y"});
	}
	if (gridZ) {
		Coordinates.drawGrid({size:10000,scale:0.01, orientation:"z"});	
	}
	if (axes) {
		Coordinates.drawAllAxes({axisLength:2,axisRadius:0.01,axisTess:50});
	}
	
	var robotBaseMaterial = new THREE.MeshPhongMaterial( { color: 0x6E23BB, specular: 0x6E23BB, shininess: 20 } );
	var robotForearmMaterial = new THREE.MeshPhongMaterial( { color: 0xF4C154, specular: 0xF4C154, shininess: 100 } );
	var robotUpperArmMaterial = new THREE.MeshPhongMaterial( { color: 0x95E4FB, specular: 0x95E4FB, shininess: 100 } );

	
	
	
	
	
	
	
//	var torus = new THREE.Mesh( 
//		new THREE.TorusGeometry( 22, 15, 32, 32 ), robotBaseMaterial );
//	torus.rotation.x = 90 * Math.PI/180;
//	scene.add( torus );

//	forearm = new THREE.Object3D();
//	var faLength = 80;

//	createRobotExtender( forearm, faLength, robotForearmMaterial );
//
//	arm = new THREE.Object3D();
//	var uaLength = 120;	
	
//	createRobotCrane( arm, uaLength, robotUpperArmMaterial );
	
	// Move the forearm itself to the end of the upper arm.
//	forearm.position.y = uaLength;	
//arm.add( forearm );
	
	//scene.add( arm );
	

	//

	
}



function init() {
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColorHex( 0xAAAAAA, 1.0 );

	var container = document.getElementById('container');
	//console.log(renderer);
	container.appendChild( renderer.domElement );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 30, canvasRatio, 1, 10000 );
	camera.position.set( 2.5, 2, 4 );
	camera.up = new THREE.Vector3( 0, 0, 1 );
	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
//	cameraControls.target.set(0.1,0,0);
	//cameraControls.object.lookAt
	fillScene();

}

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);

	if ( effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes)
	{
		gridX = effectController.newGridX;
		gridY = effectController.newGridY;
		gridZ = effectController.newGridZ;
		ground = effectController.newGround;
		axes = effectController.newAxes;

		fillScene();
	}

//	arm.rotation.y = effectController.uy * Math.PI/180;	// yaw
//	arm.rotation.z = effectController.uz * Math.PI/180;	// roll
	
//	forearm.rotation.y = effectController.fy * Math.PI/180;	// yaw
//	forearm.rotation.z = effectController.fz * Math.PI/180;	// roll
/*		if(_.has(window,"light2"))
	{
	window.light2.position.set( window.effectController.swiatlox, window.effectController.swiatloy, window.effectController.swiatloz );
	} */
	renderer.render(scene, camera);
}



function setupGui() {

	window.effectController = {

		newGridX: gridX,
		newGridY: gridY,
		newGridZ: gridZ,
		newGround: ground,
		newAxes: axes,
		
		uy: 70.0,
		uz: -15.0,
		swiatlox:-500,
		swiatloy:250,
		swiatloz:-200,
		fy: 10.0,
		fz: 60.0
	};
	if(_.has(window,"gui"))
	{
	window.gui.destroy()
	}
	window.gui = new dat.GUI();
/*	var h = gui.addFolder("Grid display");
	
	
	if(_.has(window,"light2"))
	{
	console.log(window.light2)
	window.light2.position.set( -500, 250, -200 );
	}
	h.add(window.effectController,"swiatlox",-5000,5000);
	h.add(window.effectController,"swiatloy",-5000,5000);
	h.add(window.effectController,"swiatloz",-5000,5000);
	/*
	h.add( effectController, "newGridX").name("Show XZ grid");
	h.add( effectController, "newGridY" ).name("Show YZ grid");
	h.add( effectController, "newGridZ" ).name("Show XY grid");
	h.add( effectController, "newGround" ).name("Show ground");
	h.add( effectController, "newAxes" ).name("Show axes");*/
//	console.log(gui);
//	console.log(window.robotjointcollection);
	robotjointmanipall= new App.RobotJointManipAll({
      gui:window.gui, joints: window.robotjointcollection
    });
	
	// ({gui:gui})
	//h = gui.addFolder("Swiatlo");
/*	h = gui.addFolder("Arm angles");
	h.add(effectController, "uy", -180.0, 180.0, 0.025).name("Upper arm y");
	h.add(effectController, "uz", -45.0, 45.0, 0.025).name("Upper arm z");
	h.add(effectController, "fy", -180.0, 180.0, 0.025).name("Forearm y");
	h.add(effectController, "fz", -120.0, 120.0, 0.025).name("Forearm z");*/
}

function takeScreenshot() {
	effectController.newGround = true, effectController.newGridX = false, effectController.newGridY = false, effectController.newGridZ = false, effectController.newAxes = false;
	init();
	render();
	var img1 = renderer.domElement.toDataURL("image/png");
	camera.position.set( 400, 500, -800 );
	render();
	var img2 = renderer.domElement.toDataURL("image/png");
	var imgTarget = window.open('', 'For grading script');
	imgTarget.document.write('<img src="'+img1+'"/><img src="'+img2+'"/>');
}

$(document).ready(init);
formula=new App.RobotForm();
$.when($.get("../testowe/pi_robot_urdf.urdf",parseRobot)).then(function(){
setupGui();
animate();
//console.log("fufu");
});

$("body").keydown(function(event) {
	if (event.which === 80) {
		takeScreenshot();
	}
});
