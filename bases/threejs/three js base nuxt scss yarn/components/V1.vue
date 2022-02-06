<!-- Please remove this file from your project -->
<template>
  <section>
    <div ref="canvasWrapper" class="canvasWrapper">
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
  MOUSE,
} from 'three'

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
        cameraStartingPosition: [50, 50, 0],
        cameraDistance: 50,
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
    this.resize()
    this.render()
    this.addGridHelper()
    this.addCube()
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

      this.camera.updateProjectionMatrix()
    },

    addOrbitControls() {
      this.controls = new CameraControls(this.camera, this.renderer.domElement)

      this.controls.maxPolarAngle = Math.PI / 2
      this.controls.minDistance = this.params.cameraDistance
      this.controls.maxDistance = this.params.cameraDistance
      const p = this.params.cameraStartingPosition
      this.controls.setLookAt(p[0], p[1], p[2], 0, 0, 0, false)
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

    addCube() {
      const geometry = new BoxGeometry(20, 20, 20)
      const material = new MeshNormalMaterial()
      this.cube = new Mesh(geometry, material)
      this.scene.add(this.cube)
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

      this.renderer.render(this.scene, this.camera)
    },

    destroyed() {
      window.removeEventListener('resize', this.resizeDebouncer)
    },
  },
}
</script>

<style scoped lang="scss"></style>
