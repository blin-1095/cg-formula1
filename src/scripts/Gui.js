import Stats from "stats.js";
import { Pane } from "tweakpane";

/**
 * Gui configures and controls the settings gui
 * @version 1.0.0
 */
export default class Gui {
  /**
   * Creates an instance of Gui
   *
   * @param {App} app Global application instance
   */
  constructor(app) {
    this.app = app;

    this.panel = new Pane();
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }
}
