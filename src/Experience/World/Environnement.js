import * as THREE from 'three'
import Experience from '../Experience'

export default class Environnement {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.ressources = this.experience.ressources

    this.setSunLight()
    this.setEnvironementMap()
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3, 3, -2.25)
    this.scene.add(this.sunLight)
  }

  setEnvironementMap() {
    this.environmentMap = {}
    this.environmentMap.intensity = 0.4
    this.environmentMap.texture = this.ressources.items.environmentMapTexture
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

    this.scene.environment = this.environmentMap.texture

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          console.log(child)
          child.material.envMap = this.environmentMap.texture
          child.material.envMapIntensity = this.environmentMap.intensity
          child.material.needsUpdate = true
        }
      })
    }
    this.environmentMap.updateMaterials()
  }
}
