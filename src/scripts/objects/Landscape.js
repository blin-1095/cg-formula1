/**
 * @module Objects
 */
import { MeshPhongMaterial } from "three";
import { GLTFObject } from "./GlftObject";

/**
 * House represents the surrounding landscape in a scene
 *
 * @version 1.0.0
 * @extends GLTFObject
 */
export class Landscape extends GLTFObject {
  /**
   * Create a new instance of Landscape
   *
   * @param {App} app Global application instance
   * @access public
   */
  constructor(app) {
    super(app, "./models/landscape.glb");
  }

  /** @inheritdoc */
  onLoaded(gltf) {
    // set scale and position of the object
    gltf.scene.scale.set(19.9, 19.9, 19.9);
    gltf.scene.position.set(0.2, 0.1, 0.1);

    // replace standard object material with phong material
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        const orgMat = child.material;
        const newMat = new MeshPhongMaterial();

        child.geometry.computeVertexNormals();
        newMat.map = orgMat.map;
        newMat.color = orgMat.color;

        child.material = newMat;
      }
    });

    // add object to scene
    this.app.view.scene.add(gltf.scene);

    // start water animation
    this.mixer.clipAction(gltf.animations[0]).play();
  }
}
