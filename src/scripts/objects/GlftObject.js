import { AnimationMixer, GLTF } from "three";
import App from "../App";
import { ObjectLoader } from "../utils/Loader";

/**
 * The GLTFObject represents an object for the scene and
 * implements the basic logic to load gltf files.
 *
 * @version 1.0.0
 * @abstract
 */
export class GLTFObject {
  /**
   *  Represents global application state
   *
   * @memberof GLTFObject
   * @access protected
   */
  app = undefined;

  /**
   * Represents file path or url to gltf file
   *
   * @memberof GLTFObject
   * @access protected
   */
  path = undefined;

  /**
   * Create a new instance of GLTFObject
   *
   * @param {App} app global application instance
   * @param {string} path file path or url to gltf file
   * @access protected
   * @constructor
   */
  constructor(app, path) {
    this.app = app;
    this.path = path;
    this.load(path).then(() => this.animate());
  }

  /**
   *  onLoaded is executed when the gltf object was loaded successfully
   *
   * @param {GLTF} gltf
   * @memberof GLTFObject
   * @access private
   * @return {void}
   */
  onLoaded(gltf) {
    throw new Error("Not implemented");
  }

  /**
   * Load the gltf file
   *
   * @memberof GLTFObject
   * @access protected
   * @async
   * @return {void}
   */
  async load() {
    try {
      const gltf = await ObjectLoader.gltf.loadAsync(
        this.path,
        this.onProgress
      );

      this.mixer = new AnimationMixer(gltf.scene);
      this.enableShadows(gltf);
      this.onLoaded(gltf);
    } catch (err) {
      throw new Error("Could not load GLTF Object" + err);
    }
  }

  /**
   * Enable shadows for all meshes of the gltf
   *
   * @memberof GLTFObject
   * @param {GLTF} gltf gltf object
   * @access private
   */
  enableShadows(gltf) {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  /**
   * Handle the animation for the object
   *
   * @memberof GLTFObject
   * @access protected
   * @return {void}
   */
  animate() {
    // Empty implementation. We don't need to fail
    // when this method is not implemented, because it's optional
  }

  /**
   * Update the object. Normally called in the animation loop
   *
   * @param {number} delta Clock delta
   */
  update(delta) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }
}
