import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/**
 * The ObjectLoader provides all required threejs loaders to load
 * models and textures and is implemented as singelton
 *
 * @example
 * // Usage of the GLTFLoader
 * ObjectLoader.gltf.load(path, onLoad, onProgress, onError)
 *
 * @version 1.0.0
 * @class ObjectLoader
 * @singelton
 */
export default class ObjectLoader {
  /**
   *  Hold the instance of GLTFLoader
   *
   * @memberof ObjectLoader
   * @access private
   * @type {GLTFLoader|undefined}
   */
  gltfInstance = undefined;

  /**
   *  Get an instance of the GLTFLoader
   *
   * @readonly
   * @static
   * @memberof ObjectLoader
   * @access public
   * @returns {GLTFLoader}
   * @see {@link https://threejs.org/docs/?q=gltf#examples/en/loaders/GLTFLoader} See Documentation for GLTF Loader
   */
  static get gltf() {
    if (!this.gltfLoader) {
      this.gltfLoader = new GLTFLoader();
    }
    return this.gltfLoader;
  }
}
