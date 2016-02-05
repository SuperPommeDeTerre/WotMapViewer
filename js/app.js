$(document).ready(function() {
	// get the canvas DOM element
	var canvas = $('#renderCanvas')[0];

	// load the 3D engine
	var engine = new BABYLON.Engine(canvas, true);

	// createScene function that creates and return the scene
	var createScene = function() {
		// create a basic BJS Scene object
		var scene = new BABYLON.Scene(engine);

		// create a FreeCamera, and set its position to (x:0, y:5, z:-10)
		var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(1500, 1500, -100), scene);

		// target the camera to scene origin
		camera.setTarget(BABYLON.Vector3.Zero());

		// attach the camera to the canvas
		camera.attachControl(canvas, false);

		// create a basic light, aiming 0,1,0 - meaning, to the sky
		var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
		light.diffuse = new BABYLON.Color3(50, 50, 50);
		light.specular = new BABYLON.Color3(0, 0, 0);
		light.groundColor = new BABYLON.Color3(0, 0, 0);

		var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
		groundMaterial.diffuseTexture = new BABYLON.Texture("res/maps/19_monastery.jpg", scene);

		var groundPlane = BABYLON.Mesh.CreatePlane("groundPlane", 200.0, scene);
		groundPlane.material = groundMaterial;

		var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "res/maps/19_monastery_hm.jpg", 2048, 2048, 500, 0, 300, scene, false, function() { ground.material = groundMaterial; });

		// return the created scene
		return scene;
	}

	// call the createScene function
	var scene = createScene();

	// run the render loop
	engine.runRenderLoop(function() {
		scene.render();
	});

	// the canvas/window resize event handler
	window.addEventListener('resize', function() {
		engine.resize();
	});
});
