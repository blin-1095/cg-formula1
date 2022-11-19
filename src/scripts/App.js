import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import Gui from "./Gui";
import Panel from "./Gui";
import WebGLView from "./WebGLView";

export default class App {
    constructor() {
        this.element = document.createElement('div');
        document.body.appendChild(this.element);
    }

    /**
     * Initialize the threejs application
     */
    init() {
        this.initPanel();
        this.initWebGl();
        
        this.bindEventListeners();
        this.onResize();

        this.animate();
    }

    initWebGl() {
        this.view = new WebGLView(this)
        this.element.appendChild(this.view.renderer.domElement);
    }

    initPanel() {
        this.gui = new Gui(this);
    }

    /**
     * Bind all event listeners to the current window instance
     */
    bindEventListeners() {
        this.animateHandler = this.animate.bind(this);
        window.addEventListener('resize', this.onResize.bind(this));
    }

    update() {
        this.gui.stats.begin();
        this.view.update();
    }

    render() {
        this.view.render();
        this.gui.stats.end();
    }

    animate() {
        this.raf = requestAnimationFrame(this.animateHandler);
        this.update();
        TWEEN.update();
        this.render();

    }

    /**
     * Handle window resize event
     */
    onResize() {
        this.view.onResize(window.innerWidth, window.innerHeight);
    }
}

const app = new App();
app.init();