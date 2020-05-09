var scene,renderer,camera,controls,render_stats,axesHelper,W=window.innerWidth,H=window.innerHeight,col={red:13378048,blue:3355545,black:2236962,grey:1118515,white:13421738,green:65280,void:1118481},geom={box:new THREE.BoxGeometry(1,1,1),ico:new THREE.IcosahedronGeometry(1,0),tri:new THREE.CylinderGeometry(1,1,1,3),taper:new THREE.CylinderGeometry(.5,1,1,4),cylinder:new THREE.CylinderGeometry(1,8,10,8)},mat={x_hull:new THREE.MeshStandardMaterial({color:col.white}),o_hull:new THREE.MeshStandardMaterial({color:col.grey,shading:THREE.FlatShading}),x_dec:new THREE.MeshStandardMaterial({color:col.red}),o_dec:new THREE.MeshStandardMaterial({color:col.blue}),x_pit:new THREE.MeshStandardMaterial({color:col.black}),o_pit:new THREE.MeshStandardMaterial({color:col.green})},boids=[],params={backgroundColor:"black",gridColor:"white",gridOpacity:.5,boidsScale:1,boidsSegments:16,boidsColor:{vk:new THREE.Color("rgb(51, 51, 153)"),gwk:new THREE.Color("rgb(12, 214, 146)"),is:new THREE.Color("rgb(251, 239, 94)"),kum:new THREE.Color("rgb(204,34, 0)")},boidsAmount:{kum:25,vk:25,gwk:25,is:25},wireframe:!1};function setupRender(){scene=new THREE.Scene,(camera=new THREE.PerspectiveCamera(40,W/H,.1,1e3)).position.set(0,250,400),camera.lookAt(scene.position),(renderer=new THREE.WebGLRenderer({antialias:!0})).setSize(W,H),renderer.setClearColor(params.backgroundColor),document.body.appendChild(renderer.domElement),window.addEventListener("resize",onWindowResize,!1)}function onWindowResize(){camera.aspect=W/H,camera.updateProjectionMatrix(),renderer.setSize(W,H),controls.handleResize()}function setupLights(){var e=new THREE.AmbientLight(10066329,1),o=new THREE.HemisphereLight(16777164,2236928,1);o.position.setY(15);var t=new THREE.DirectionalLight;scene.add(e,o,t)}function addAxesHelper(){var e=new THREE.GridHelper(400,20,params.gridColor,params.gridColor);e.material.transparent=!0,e.material.opacity=params.gridOpacity,e.position.y=-50,scene.add(e)}function setupControls(){(controls=new THREE.TrackballControls(camera,renderer.domElement)).rotateSpeed=1,controls.zoomSpeed=1.2,controls.panSpeed=.8,controls.noZoom=!1,controls.noPan=!1,controls.staticMoving=!0,controls.dynamicDampingFactor=.3,controls.keys=[65,83,68]}function setupStats(){(render_stats=new Stats).domElement.style.position="absolute",render_stats.domElement.style.top="1px",render_stats.domElement.style.zIndex=100,render_stats.domElement.hidden=!1,document.body.appendChild(render_stats.domElement)}function setupFlock(e,o,t,r){for(var a=0;a<e;)boids[a]=new Boid("kum"),a++;for(;a<e+o;)boids[a]=new Boid("vk"),a++;for(;a<e+o+t;)boids[a]=new Boid("gwk"),a++;for(;a<e+o+t+r;)boids[a]=new Boid("is"),a++}function kumBoid(){let e=new THREE.CylinderGeometry(0,4,16,params.boidsSegments),o=params.boidsColor.kum,t=new THREE.MeshStandardMaterial({color:o,wireframe:params.wireframe,roughness:1});var r=new THREE.Mesh(e,t);r.position.set(0,0,0),r.scale.set(params.boidsScale,params.boidsScale,params.boidsScale),r.rotateX(THREE.Math.degToRad(90));var a=new THREE.Group;a.add(r),a.castShadow=!0,this.mesh=a}function vkBoid(){let e=new THREE.CylinderGeometry(0,4,16,params.boidsSegments),o=params.boidsColor.vk,t=new THREE.MeshStandardMaterial({color:o,wireframe:params.wireframe,roughness:1});var r=new THREE.Mesh(e,t);r.position.set(0,0,0),r.scale.set(params.boidsScale,params.boidsScale,params.boidsScale),r.rotateX(THREE.Math.degToRad(90));var a=new THREE.Group;a.add(r),a.castShadow=!0,this.mesh=a}function gwkBoid(){let e=new THREE.CylinderGeometry(0,4,16,params.boidsSegments),o=params.boidsColor.gwk,t=new THREE.MeshStandardMaterial({color:o,wireframe:params.wireframe,roughness:1});var r=new THREE.Mesh(e,t);r.position.set(0,0,0),r.scale.set(params.boidsScale,params.boidsScale,params.boidsScale),r.rotateX(THREE.Math.degToRad(90));var a=new THREE.Group;a.add(r),a.castShadow=!0,this.mesh=a}function isBoid(){let e=new THREE.CylinderGeometry(0,4,16,params.boidsSegments),o=params.boidsColor.is,t=new THREE.MeshStandardMaterial({color:o,wireframe:params.wireframe,roughness:1});var r=new THREE.Mesh(e,t);r.position.set(0,0,0),r.scale.set(params.boidsScale,params.boidsScale,params.boidsScale),r.rotateX(THREE.Math.degToRad(90));var a=new THREE.Group;a.add(r),a.castShadow=!0,this.mesh=a}function rrand(e,o){return Math.random()*(o-e)+e}function Boid(e){switch(e){case"kum":this.position=new THREE.Vector3(rrand(250,500),rrand(-200,200),0),this.velocity=new THREE.Vector3(rrand(-1,1),rrand(-1,1),rrand(-1,1)),this.acceleration=new THREE.Vector3(0,0,0),this.mass=5,this.obj=new kumBoid,this.home=new THREE.Vector3(59,59,100);break;case"vk":this.position=new THREE.Vector3(rrand(100,-250),rrand(-100,100),0),this.velocity=new THREE.Vector3(rrand(-1,1),rrand(-1,1),rrand(-1,1)),this.acceleration=new THREE.Vector3(0,0,0),this.mass=2,this.obj=new vkBoid,this.home=new THREE.Vector3(59,-59,50);break;case"gwk":this.position=new THREE.Vector3(rrand(100,-200),rrand(-100,100),0),this.velocity=new THREE.Vector3(rrand(-1,1),rrand(-1,1),rrand(-1,1)),this.acceleration=new THREE.Vector3(0,0,0),this.mass=1,this.obj=new gwkBoid,this.home=new THREE.Vector3(-59,-59,-100);break;case"is":this.position=new THREE.Vector3(rrand(200,-400),rrand(-200,200),0),this.velocity=new THREE.Vector3(rrand(-1,1),rrand(-1,1),rrand(-1,1)),this.acceleration=new THREE.Vector3(0,0,0),this.mass=3,this.obj=new isBoid,this.home=new THREE.Vector3(-59,59,-50)}scene.add(this.obj.mesh)}function render(){requestAnimationFrame(render);for(var e=0;e<boids.length;e++)boids[e].step(boids);controls.update(),renderer.render(scene,camera),render_stats.update()}setupRender(),setupLights(),setupFlock(params.boidsAmount.kum,params.boidsAmount.vk,params.boidsAmount.gwk,params.boidsAmount.is),setupControls(),addAxesHelper(),setupStats(),Boid.prototype.step=function(e){this.accumulate(e),this.update(),this.obj.mesh.position.set(this.position.x,this.position.y,this.position.z)},Boid.prototype.accumulate=function(e){var o,t,r,a;o=this.separate(e).multiplyScalar(.02*this.mass),t=this.align(e).multiplyScalar(.05),r=this.cohesion(e).multiplyScalar(.01),(a=this.steer(this.home).multiplyScalar(1e-4)).multiplyScalar(this.position.distanceTo(this.home)*this.mass),this.acceleration.add(o),this.acceleration.add(t),this.acceleration.add(r),this.acceleration.add(a),this.acceleration.divideScalar(this.mass)},Boid.prototype.update=function(){this.velocity.add(this.acceleration),this.position.add(this.velocity),this.acceleration.set(0,0,0);var e=this.type?this.position.clone():this.velocity.clone();this.obj.mesh.lookAt(e)},Boid.prototype.separate=function(e){for(var o,t=new THREE.Vector3(0,0,0),r=0,a=0;a<e.length;a++){o=e[a];var i=this.position.distanceTo(o.position);if(i<60&&i>0){var s=this.position.clone();s.sub(o.position),s.normalize(),s.divideScalar(i),t.add(s),r++}}return r>0&&(t.divideScalar(r),t.normalize()),t},Boid.prototype.align=function(e){for(var o,t=new THREE.Vector3(0,0,0),r=0,a=0;a<e.length;a++){o=e[a];var i=this.position.distanceTo(o.position);i<100&&i>0&&(t.add(o.velocity),r++)}return r>0&&(t.divideScalar(r),t.limit(1)),t},Boid.prototype.cohesion=function(e){for(var o,t=new THREE.Vector3(0,0,0),r=0,a=0;a<e.length;a++){o=e[a];var i=this.position.distanceTo(o.position);i<100&&i>0&&(t.add(o.position),r++)}return r>0?(t.divideScalar(r),this.steer(t)):t},Boid.prototype.steer=function(e){var o=new THREE.Vector3(0,0,0),t=(new THREE.Vector3).subVectors(e,this.position);return t.length()>0&&(t.normalize(),o.subVectors(t,this.velocity)),o},THREE.Vector3.prototype.limit=function(e){this.length()>e&&(this.normalize(),this.multiplyScalar(e))},render();