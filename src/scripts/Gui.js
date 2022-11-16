import Stats from "stats.js";
import { Pane } from "tweakpane";

export default class Gui {
  constructor(app) {
    this.app = app;

    this.initPanel();
    this.initStats();
  }

  initPanel() {
    this.panel = new Pane();
  }

  initStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }
}
