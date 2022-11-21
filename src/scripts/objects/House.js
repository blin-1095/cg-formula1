/**
 * @module Objects
 */
import { MathUtils } from "three";
import { GLTFObject } from "./GlftObject";

/**
 * House represents a windmill object in a scene
 *
 * @version 1.0.0
 * @extends GLTFObject
 */
export class House extends GLTFObject {
  /**
   * Create a new instance of House
   *
   * @param {App} app Global application instance
   * @access public
   */
  constructor(app) {
    super(app, "./models/house.glb");
  }

  /** @inheritdoc */
  onLoaded(gltf) {
    // set position and rotation
    gltf.scene.position.set(20, 24, -30);
    gltf.scene.rotateY(MathUtils.degToRad(45));

    // add object to scene
    this.app.view.scene.add(gltf.scene);
  }
}
