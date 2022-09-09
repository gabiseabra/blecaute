import * as THREE from 'three'
import { Scene } from './Scene'

const FOV = 45
const NEAR = 50
const FAR = 1500

class SceneElement extends HTMLElement {
  private scene = new Scene()
  private camera = new THREE.PerspectiveCamera(FOV, 1, 1, FAR)
  private renderer = new THREE.WebGLRenderer({
    powerPreference: 'high-performance',
    antialias: true
  })
  private resizeObserver = new ResizeObserver(
    ([{contentRect: {width, height}}]) =>
      this.onResize(width, height)
  )

  onResize = (width: number, height: number) => {
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  loop = () => this.renderer.render(this.scene, this.camera)

  connectedCallback() {
    this.resizeObserver.observe(this)
    this.onResize(this.clientWidth, this.clientHeight)
    this.appendChild(this.renderer.domElement)
    this.renderer.setAnimationLoop(this.loop)
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect()
    this.removeChild(this.renderer.domElement)
    this.renderer.setAnimationLoop(null)
  }
}

window.customElements.define('blecaute-scene', SceneElement)
