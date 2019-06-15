/* eslint-disable */

function SolarSystem() {
	this.params = {
		width: window.innerWidth,
		height: window.innerHeight,

		gridColor: "white",
		gridOpacity: 0.5,
		gridSize: 400,
		gridDivisions: 20,

	}

	this.init();
}

SolarSystem.prototype.init = function () {
	this.setupRender();
	this.setupLights();
	this.addAxesHelper();
	this.setupControls();
	this.setupStats();
	this.render();
}

SolarSystem.prototype.setupRender = function () {
	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera(40, this.params.width / this.params.height, 0.1, 1000);
	this.camera.position.set(0, 250, 400);
	this.camera.lookAt(this.scene.position);

	this.renderer = new THREE.WebGLRenderer({ antialias: true });
	this.renderer.setSize(this.params.width, this.params.height);
	// this.renderer.setClearColor(this.params.backgroundColor);
	//raycaster = new THREE.Raycaster();

	document.body.appendChild(this.renderer.domElement);
	window.addEventListener('resize', this.resize.bind(this), false);
}

SolarSystem.prototype.resize = function () {
	console.log('resize');
	this.params.width = window.innerWidth;
	this.params.height = window.innerHeight;

	let W = this.params.width;
	let H = this.params.height;

	this.camera.aspect = W / H;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize(W, H);
	this.controls.handleResize();
}

SolarSystem.prototype.setupLights = function () {
	var light_amb = new THREE.AmbientLight(0x999999, 1);

	var light_hem = new THREE.HemisphereLight(0xFFFFCC, 0x222200, 1);
	light_hem.position.setY(15);

	var light_dir = new THREE.DirectionalLight();

	this.scene.add(light_amb, light_hem, light_dir);
};

SolarSystem.prototype.addAxesHelper = function () {
	var gridHelper = new THREE.GridHelper(this.params.gridSize, this.params.gridDivisions, this.params.gridColor, this.params.gridColor);
	gridHelper.material.transparent = true;
	gridHelper.material.opacity = this.params.gridOpacity;
	gridHelper.position.y = -50;
	this.scene.add(gridHelper);
}

SolarSystem.prototype.setupControls = function () {
	this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
	this.controls.rotateSpeed = 1.0;
	this.controls.zoomSpeed = 1.2;
	this.controls.panSpeed = 0.8;

	this.controls.noZoom = false;
	this.controls.noPan = false;

	this.controls.staticMoving = true;
	this.controls.dynamicDampingFactor = 0.3;

	this.controls.keys = [65, 83, 68];

	// controls.addEventListener( 'change', render );
}

SolarSystem.prototype.setupStats = function () {
	this.renderStats = new Stats();
	this.renderStats.domElement.style.position = 'absolute';
	this.renderStats.domElement.style.top = '1px';
	this.renderStats.domElement.style.zIndex = 100;

	this.renderStats.domElement.hidden = false;
	document.body.appendChild(this.renderStats.domElement);
}

SolarSystem.prototype.render = function () {
	requestAnimationFrame(this.render.bind(this));
	this.controls.update();
	this.renderer.render(this.scene, this.camera);
	this.renderStats.update();
};