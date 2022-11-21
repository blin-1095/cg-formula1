/**
 * @module Objects
 */
import { GLTFObject } from "./GlftObject";

/**
 * Track represents the racing track object in a scene
 *
 * @version 1.0.0
 * @extends GLTFObject
 */
export class Track extends GLTFObject {
  constructor(app) {
    super(app, "./models/track.glb");
  }

  /** @inheritdoc */
  onLoaded(gltf) {
    // set  position and scale of the object
    gltf.scene.position.set(-4.9, 24.7, -33.4);
    gltf.scene.scale.set(0.1, 0.1, 0.1);

    // add object to scene
    this.app.view.scene.add(gltf.scene);
  }
}
