/**
 * @module Objects
 */
import { MathUtils } from "three";
import { App } from "../App";
import { GLTFObject } from "./GlftObject";

/**
 * Windmill represents the windmill object in a scene
 *
 * @version 1.0.0
 * @extends GLTFObject
 */
export default class Windmill extends GLTFObject {
  /**
   * Create a new instance of Windmill
   *
   * @param {App} app Global application instance
   * @access public
   */
  constructor(app) {
    super(app, "./models/windmill.glb");
  }

  /** @inheritdoc */
  onLoaded(gltf) {
    // set rotation and position of the object
    gltf.scene.position.set(-15, 25, -4.5);
    gltf.scene.rotateY(MathUtils.degToRad(250));

    // start mill animation
    this.mixer.clipAction(gltf.animations[0]).play();

    // add object to scene
    this.app.view.scene.add(gltf.scene);
  }
}
