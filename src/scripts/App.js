import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import Gui from "./Gui";
import { ObjectLoader } from "./utils/Loader";
import WebGLView from "./WebGLView";

/**
 * App is the global application instance and handles the
 * whole webpage
 *
 * @version 1.0.0
 */
export default class App {
  /**
   * Initialize the threejs application
   */
  constructor() {
    if (!document.createElement("canvas").getContext("webgl2")) {
      alert("Please make sure your browser supports WebGL2");
      return;
    }

    // create instances of global objects
    this.gui = new Gui(this);
    this.view = new WebGLView(this);

    // bind global event listeners
    this.bindEventListeners();
    this.onResize();
  }

  /**
   * Start the application lifecycle
   *
   * @access public
   */
  run() {
    // execute animation loop
    this.animate();
  }

  /**
   * Bind all event listeners to the current window instance
   *
   * @access private
   */
  bindEventListeners() {
    this.animateHandler = this.animate.bind(this);
    ObjectLoader.manager.onLoad = this.onLoad.bind(this);
    window.addEventListener("resize", this.onResize.bind(this));
  }

  /**
   * Handler executed after loading the webgl scene
   *
   * @access private
   */
  onLoad() {
    document.getElementById("loader").remove();
    document.body.appendChild(this.view.renderer.domElement);
  }

  /**
   * Handle window resize event
   * @access private
   */
  onResize() {
    this.view.onResize(window.innerWidth, window.innerHeight);
  }

  /**
   * Animation loop
   *
   * @access private
   */
  animate() {
    this.raf = requestAnimationFrame(this.animateHandler);
    this.update();
    TWEEN.update();
    this.render();
  }

  /**
   * Update all required object instances
   *
   * @access private
   */
  update() {
    this.gui.stats.begin();
    this.view.update();
  }

  /**
   * Render the scene
   *
   * @access private
   */
  render() {
    this.view.render();
    this.gui.stats.end();
  }
}

// Start application
const app = new App();
app.run();
