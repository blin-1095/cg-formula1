import ObjectLoader from "../utils/Loader";
import App from "../App";
import { GLTF } from "three";

/**
 * The GLTFObject represents an object for the scene and
 * implements the basic logic to load gltf files.
 *
 * @version 1.0.0
 * @export
 * @class GLTFObject
 * @abstract
 */
export default class GLTFObject {
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
   * @access public
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
   * @access protected
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
      this.onLoaded(gltf);
    } catch (err) {
      throw new Error("Could not load GLTF Object" + err);
    }
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
}
