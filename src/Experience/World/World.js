import Experience from '../Experience.js'
import Environnement from './Environnement.js'
import Floor from './Floor.js'
import Fox from './Fox.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.ressources = this.experience.ressources

    this.ressources.on('ready', () => {
      this.floor = new Floor()
      this.fox = new Fox()
      this.environnement = new Environnement()
    })
  }

  update() {
    if (this.fox) {
      this.fox.update()
    }
  }
}
