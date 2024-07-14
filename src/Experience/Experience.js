import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Ressources from './Utils/Ressources.js'
import sources from './Utils/sources.js'

let instance = null

export default class Experience {
  constructor(_canvas) {
    if (instance) {
      return instance
    }

    instance = this

    window.experience = this

    this.canvas = _canvas

    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.ressources = new Ressources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
  }
}
