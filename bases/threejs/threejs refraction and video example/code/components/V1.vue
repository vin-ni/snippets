<!-- Please remove this file from your project -->
<template>
  <section>
    <div ref="canvasWrapper" class="canvasWrapper">
      <video ref="videoplayer" loop muted src=""></video>
      <canvas ref="canvasRenderer"></canvas>
    </div>
  </section>
</template>

<script>
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  // MeshStandardMaterial,
  // MeshBasicMaterial,
  Mesh,
  Color,
  MathUtils,
  // LoadingManager,
  AmbientLight,
  Box3,
  Fog,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Sphere,
  Raycaster,
  Matrix4,
  Spherical,
  sRGBEncoding,
  // PlaneGeometry,
  // PlaneBufferGeometry,
  // Float32BufferAttribute,
  // BufferGeometry,
  // Group,
  UniformsUtils,
  // Line3,
  Clock,
  BoxGeometry,
  // FrontSide,
  GridHelper,
  // SphereGeometry,
  MeshNormalMaterial,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  MOUSE,
  VideoTexture,
  PlaneGeometry,
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import CameraControls from 'camera-controls'
import debounce from 'lodash.debounce'

const subsetOfTHREE = {
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,

  MathUtils: {
    DEG2RAD: MathUtils.DEG2RAD,
    clamp: MathUtils.clamp,
  },
}

CameraControls.install({ THREE: subsetOfTHREE })

export default {
  name: 'VersionOne',
  components: {},
  data() {
    return {
      params: {
        rendererSize: [0, 0],
        cameraStartingPosition: [0, 0, -50],
        cameraDistance: 50,
        addGrid: false,
      },

      model: {
        url: '/logo_raw.gltf',
        scale: 1.5,
      },

      video: {
        size: { width: 1280, height: 720 },
        url: '/video2.mp4',
        texture: null,
        position: {
          x: 0,
          y: 0,
          z: 70,
        },
        cameraDistance: 70,
      },

      debug: {
        image: '',
      },
    }
  },
  computed: {},
  mounted() {
    this.setup()
    this.addRenderer()
    this.addEventListeners()
    this.addCamera()
    this.addOrbitControls()
    this.addOrbitControlsEventlisteners()
    this.setupVideo()
    this.loadModel(this.model.url)
    this.resize()
    this.render()

    // this.addBackgroundDebug()
    if (this.params.addGrid) {
      this.addGridHelper()
    }
  },
  created() {
    this.resizeDebouncer = debounce(function () {
      this.resize()
    }, 250)
  },
  methods: {
    setup() {
      this.wrapper = this.$refs.canvasWrapper
      this.clock = new Clock()
    },
    addRenderer() {
      this.renderer = new WebGLRenderer({
        antialias: true,
        canvas: this.$refs.canvasRenderer,
      })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(0x000000, 1)

      this.params.rendererSize = [
        this.wrapper.clientWidth,
        this.wrapper.clientHeight,
      ]

      this.renderer.outputEncoding = sRGBEncoding

      this.scene = new Scene()
      this.scene.background = new Color(this.params.background)

      const light = new AmbientLight(0xffffff, 1) // soft white light
      this.scene.add(light)
    },

    addEventListeners() {
      window.addEventListener('resize', this.resize)
    },

    addGridHelper() {
      const size = 200
      const divisions = 30

      const gridHelper = new GridHelper(size, divisions)
      this.scene.add(gridHelper)
    },
    addCamera() {
      this.camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        500
      )

      const p = this.params.cameraStartingPosition
      this.camera.position.set(p[0], p[1], p[2])
      this.camera.updateProjectionMatrix()
    },

    addOrbitControls() {
      this.controls = new CameraControls(this.camera, this.renderer.domElement)

      this.controls.maxPolarAngle = Math.PI / 2
      this.controls.minDistance = this.params.cameraDistance
      this.controls.maxDistance = this.params.cameraDistance
      this.controls.dolly(this.params.cameraDistance, false)
      this.controls.truckSpeed = 0
    },
    addOrbitControlsEventlisteners() {
      const onRest = () => {
        this.controls.removeEventListener('rest', onRest)
        this.userDragging = false
        this.disableAutoRotate = false
      }

      this.controls.addEventListener('controlstart', () => {
        this.controls.removeEventListener('rest', onRest)
        this.userDragging = true
        this.disableAutoRotate = true
      })
      this.controls.addEventListener('controlend', () => {
        if (this.controls.active) {
          this.controls.addEventListener('rest', onRest)
        } else {
          onRest()
        }
      })

      this.controls.addEventListener('transitionstart', () => {
        if (this.userDragging) return

        this.disableAutoRotate = true
        this.controls.addEventListener('rest', onRest)
      })
    },

    setupVideo() {
      this.$refs.videoplayer.src = this.video.url
      this.$refs.videoplayer.muted = true
      this.$refs.videoplayer.play()
      this.video.texture = new VideoTexture(this.$refs.videoplayer)
      const parameters = { color: 0xffffff, map: this.video.texture }
      const material = new MeshLambertMaterial(parameters)

      console.log(this.video.texture)

      // add plane in the background
      const geometry = new PlaneGeometry(160, 90)
      //     this.video.videoPlane = new Mesh(geometry, new MeshNormalMaterial())
      this.video.videoPlane = new Mesh(geometry, material)

      this.video.videoPlane.lookAt(this.camera.position)

      this.video.videoPlane.position.set(
        this.video.position.x,
        this.video.position.y,
        this.video.position.z
      )

      this.scene.add(this.video.videoPlane)
    },

    loadModel(url) {
      new GLTFLoader().load(url, (res) => {
        this.params.model = res.scene
        this.placeModel(res.scene)
      })
    },

    placeModel(model) {
      model.scale.setScalar(this.model.scale)
      model.lookAt(this.camera.position)
      model.rotateY(-90 * MathUtils.DEG2RAD)

      model.children.forEach((element) => {
        // element.material = new MeshNormalMaterial()
        element.material = new MeshPhysicalMaterial({
          roughness: 0,
          transmission: 1,
          thickness: 1000,
        })
        element.material.transparent = true
      })

      this.scene.add(model)
    },

    resize() {
      this.params.rendererSize = [
        this.wrapper.clientWidth,
        this.wrapper.clientHeight,
      ]

      this.camera.aspect = this.wrapper.clientWidth / this.wrapper.clientHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(
        this.params.rendererSize[0],
        this.params.rendererSize[1]
      )
      this.renderer.outputEncoding = sRGBEncoding

      this.renderer.setPixelRatio(window.devicePixelRatio)
    },

    render() {
      if (this.params.pauseRender) return
      requestAnimationFrame(this.render)
      const delta = Math.min(this.clock.getDelta(), 0.1)

      this.controls.update(delta)
      // auto rotation
      // if (!this.disableAutoRotate) {
      //   this.controls.azimuthAngle += 1 * delta * MathUtils.DEG2RAD
      // }

      // rotate the plane in front of the camera
      const vec = new Vector3(0, 0, -this.video.cameraDistance)
      vec.applyQuaternion(this.camera.quaternion)
      this.video.videoPlane.position.copy(vec)
      this.video.videoPlane.lookAt(this.camera.position)

      // this.video.videoPlane.lookAt(this.camera.position)

      this.renderer.render(this.scene, this.camera)
    },

    destroyed() {
      window.removeEventListener('resize', this.resizeDebouncer)
    },
  },
}
</script>

<style scoped lang="scss"></style>
