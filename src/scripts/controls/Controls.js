import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";
import {FlyControls} from "three/examples/jsm/controls/FlyControls";
import {Raycaster} from "three";

export class Controls {
    constructor(app, camera, renderer, raycaster, sceneMeshes) {
        this.app = app;
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = raycaster;
        this.sceneMesehs = sceneMeshes;

        this.activateOrbitControls();

        if (app.gui.panel) {
            this.registerControls(app.gui.panel);
        }
    }

    /**
     *
     * @param panel
     */
    registerControls(panel) {
        const folder = panel.addFolder({title: "Kamera"});
        folder.addButton({title: "First Person"}).on("click", this.activateFirstPersonControls.bind(this));
        folder.addButton({title: "Orbit"}).on("click", this.activateOrbitControls.bind(this));
    }

    activateFirstPersonControls() {
        if(this.controls) {
            this.controls.dispose();
        }

        this.controls = new FlyControls(this.camera, this.renderer.domElement);
        this.controls.enabled = true;
        this.controls.movementSpeed = 6;
        this.controls.dragToLook = true;
        this.controls.rollSpeed = 0.5;
        this.camera.position.set(0, 30, 0);

        this.controls.addEventListener('change', () => {

        });
    }

    activateOrbitControls() {
        if(this.controls) {
            this.controls.dispose();
        }

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enabled = true;
        this.camera.position.set(20, 50, 70);
    }

    update(delta) {
        if (this.controls) {
            this.controls.update(delta);
        }
    }
}