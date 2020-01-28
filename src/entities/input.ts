import InputModel from "../models/InputModel"

export default class Input implements InputModel {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  scene: Phaser.Scene
  keys: {[x: string]: Phaser.Input.Keyboard.Key} = {}

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.cursors = scene.input.keyboard.createCursorKeys()
    this.keys = this.batchKeyboardKeysInit(['w', 'a', 's', 'd'])
  }

  public isLeft() {
    const { cursors, keys } = this
    return cursors.left?.isDown || keys['a']?.isDown
  }

  public isRight() {
    const { cursors, keys } = this
    return cursors.right?.isDown || keys['d']?.isDown
  }

  public isUp() {
    const { cursors, keys } = this
    return cursors.up?.isDown || keys['w']?.isDown
  }

  public isDown() {
    const { cursors, keys } = this
    return cursors.down?.isDown || keys['s']?.isDown
  }

  private initKeyboardKey(k: string) {
    const { scene } = this
    return scene.input.keyboard.addKey(k)
  }

  private batchKeyboardKeysInit(keyboardKeys: string[]){
    return keyboardKeys
      .map( key => ({ [key]: this.initKeyboardKey(key) }) )
      .reduce( (acc, n) => ({ ...n, ...acc}) , {})
  }
}