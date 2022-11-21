import { LoadingManager } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
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
 * @exports ObjectLoader
 * @singelton
 */
export class ObjectLoader {
  loadingManager = undefined;

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
    // We initialize a new GLTF Loader instance and attach the
    // DRACOLoader for decompression when no GLTF loader instance exists
    if (!this.gltfLoader) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("./decoder/");

      this.gltfLoader = new GLTFLoader(this.manager);
      this.gltfLoader.setDRACOLoader(dracoLoader);
    }

    return this.gltfLoader;
  }

  /**
   * Get an instance of the LoadingManager which
   * takes care of the whole asset loading process
   *
   * @readonly
   * @static
   * @memberof ObjectLoader
   * @access public
   * @returns {LoadingManager}
   * @see {@link https://threejs.org/docs/#api/en/loaders/managers/LoadingManager} See Documentation for LoadingManager
   */
  static get manager() {
    if (!this.loadingManager) {
      this.loadingManager = new LoadingManager();
    }

    return this.loadingManager;
  }
}
