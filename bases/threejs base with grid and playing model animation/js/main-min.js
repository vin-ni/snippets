function SolarSystem(){this.params={width:window.innerWidth,height:window.innerHeight,gridColor:"white",gridOpacity:.5,gridSize:400,gridDivisions:20},this.init()}SolarSystem.prototype.init=function(){this.setupRender(),this.setupLights(),this.addAxesHelper(),this.setupControls(),this.setupStats(),this.loadModel(),this.render()},SolarSystem.prototype.setupRender=function(){this.scene=new THREE.Scene,this.camera=new THREE.PerspectiveCamera(40,this.params.width/this.params.height,.1,1e3),this.camera.position.set(0,250,400),this.camera.lookAt(this.scene.position),this.renderer=new THREE.WebGLRenderer({antialias:!0}),this.renderer.setSize(this.params.width,this.params.height),document.body.appendChild(this.renderer.domElement),window.addEventListener("resize",this.resize.bind(this),!1),this.clock=new THREE.Clock},SolarSystem.prototype.resize=function(){console.log("resize"),this.params.width=window.innerWidth,this.params.height=window.innerHeight;let t=this.params.width,e=this.params.height;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e),this.controls.handleResize()},SolarSystem.prototype.setupLights=function(){var t=new THREE.AmbientLight(16777215,2),e=new THREE.HemisphereLight(16777164,2236928,3);e.position.setY(15);var i=new THREE.DirectionalLight;this.scene.add(t,e,i)},SolarSystem.prototype.addAxesHelper=function(){var t=new THREE.GridHelper(this.params.gridSize,this.params.gridDivisions,this.params.gridColor,this.params.gridColor);t.material.transparent=!0,t.material.opacity=this.params.gridOpacity,t.position.y=0,this.scene.add(t)},SolarSystem.prototype.setupControls=function(){this.controls=new THREE.TrackballControls(this.camera,this.renderer.domElement),this.controls.rotateSpeed=1,this.controls.zoomSpeed=1.2,this.controls.panSpeed=.8,this.controls.noZoom=!1,this.controls.noPan=!1,this.controls.staticMoving=!0,this.controls.dynamicDampingFactor=.3,this.controls.keys=[65,83,68]},SolarSystem.prototype.setupStats=function(){this.renderStats=new Stats,this.renderStats.domElement.style.position="absolute",this.renderStats.domElement.style.top="1px",this.renderStats.domElement.style.zIndex=100,this.renderStats.domElement.hidden=!1,document.body.appendChild(this.renderStats.domElement)},SolarSystem.prototype.loadModel=function(){var t=this;(new THREE.GLTFLoader).load("./model/Pendulum.glb",(function(e){t.scene.add(e.scene),e.scene.scale.set(10,10,10),t.startAnimation(e)}),(function(t){console.log(t.loaded/t.total*100+"% loaded")}),(function(t){console.log("An error happened")}))},SolarSystem.prototype.startAnimation=function(t){this.mixer=new THREE.AnimationMixer(t.scene);this.mixer.clipAction(t.animations[0]).play()},SolarSystem.prototype.render=function(){requestAnimationFrame(this.render.bind(this)),this.controls.update(),this.renderer.render(this.scene,this.camera),this.mixer&&(deltaSeconds=this.clock.getDelta(),this.mixer.update(deltaSeconds)),this.renderStats.update()};