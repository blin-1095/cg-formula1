import { Camera, Renderer } from "three";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { Pane } from "tweakpane";
import App from "./App";

/**
 * The ControlManager handles the registration, activation
 * and configuration of the scene controls
 *
 * @version 1.0.0
 */
export class ControlManager {
  /**
   * Creates an instance of ControlManager
   *
   * @param {App} app Global application instance
   * @param {Renderer} renderer Threejs renderer instance
   * @param {Camera} camera Threejs camera instance
   * @param {Pane} panel GUI pane instance
   * @memberof ControlManager
   */
  constructor(app, renderer, camera, panel) {
    this.app = app;
    this.renderer = renderer;
    this.camera = camera;

    this.registerControls(panel);
    this.activateOrbitControls();
  }

  /**
   * Register configuration inputs for the global gui
   *
   * @param {Panel} panel
   * @access private
   */
  registerControls(panel) {
    const folder = panel.addFolder({ title: "Kamera" });

    folder
      .addButton({ title: "OrbitControls" })
      .on("click", this.activateOrbitControls.bind(this));
    folder
      .addButton({ title: "FlyControls" })
      .on("click", this.activateFlyControls.bind(this));

    folder
      .addButton({ title: "Auto" })
      .on("click", this.attachToCar.bind(this));

    folder.addSeparator();

    folder
      .addButton({ title: "Haus - Vorgarten" })
      .on("click", this.activateHouseFront.bind(this));
    folder
      .addButton({ title: "Haus - Garage" })
      .on("click", this.activateHouseGarage.bind(this));
    folder
      .addButton({ title: "Haus - Wohnzimmer" })
      .on("click", this.activateHouseLivingRoom.bind(this));
    folder
      .addButton({ title: "Haus - Küche" })
      .on("click", this.activateHouseKitchen.bind(this));
    folder
      .addButton({ title: "Haus - Schlafzimmer" })
      .on("click", this.activateHouseBedroom.bind(this));
  }

  /**
   * Detach current activated control from camera
   *
   * @access private
   */
  disposeCurrentControls() {
    this.current = undefined;
    if (this.controls) {
      this.controls.dispose();
    }
  }

  /**
   * Update the control manager. Usually called in the
   * rendering lifecycle
   *
   * @param {number} delta animation delta
   * @access public
   */
  update(delta) {
    // update controls
    if (this.controls && typeof this.controls.update === "function") {
      this.controls.update(delta);
    }
    // update car attachment
    if (this.current == "CAR") {
      this.updateCarView();
    }
  }

  /**
   * Activate FlyControls
   *
   * @see {@link https://threejs.org/docs/#examples/en/controls/FlyControls} FlyControls
   */
  activateFlyControls() {
    this.disposeCurrentControls();
    this.controls = new FlyControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.movementSpeed = 8;
    this.controls.rollSpeed = 0.2;
    this.controls.dragToLook = true;
    this.camera.position.set(0, 50, -50);
    this.camera.lookAt(0, 0, 0);
  }

  /**
   * Activate OrbitControls
   *
   * @see {@link https://threejs.org/docs/#examples/en/controls/OrbitControls} OrbitControls
   */
  activateOrbitControls() {
    this.disposeCurrentControls();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
  }

  /**
   * Activate PointerLockControls
   *
   * @see {@link https://threejs.org/docs/#examples/en/controls/PointerLockControls} PointerLockControls
   */
  activatePointerLockControls() {
    this.disposeCurrentControls();
    this.controls = new PointerLockControls(
      this.camera,
      this.renderer.domElement
    );
  }

  /**
   * Activate the view for the house front (garden)
   */
  activateHouseFront() {
    this.disposeCurrentControls();
    this.activateFlyControls();
    this.camera.position.set(0.83, 28, -26.81);
    this.camera.lookAt(25, 24, -33);
  }

  /**
   * Activate the view for the house garage (car)
   */
  activateHouseGarage() {
    this.disposeCurrentControls();
    this.activateFlyControls();
    this.camera.position.set(11.5, 25.8, -30.6);
    this.camera.lookAt(15.8, 25.8, -35.6);
  }

  /**
   * Activate the view for the house living room
   */
  activateHouseLivingRoom() {
    this.disposeCurrentControls();
    this.activateFlyControls();
    this.camera.position.set(20.55, 25.75, -27.56);
    this.camera.lookAt(21.47, 25.3, -30.18);
  }

  /**
   * Activate the view for the house kitchen
   */
  activateHouseKitchen() {
    this.disposeCurrentControls();
    this.activateFlyControls();
    this.camera.position.set(23.21, 26.12, -29.58);
    this.camera.lookAt(21.34, 25.71, -28);
  }

  /**
   * Activate the view for the house bedroom
   */
  activateHouseBedroom() {
    this.disposeCurrentControls();
    this.activateFlyControls();
    this.camera.position.set(22.18, 27.79, -31.22);
    this.camera.lookAt(18.22, 26.58, -33);
  }

  /**
   * Activate the view attached to the car
   */
  attachToCar() {
    this.disposeCurrentControls();
    this.activateFlyControls();
    this.current = "CAR";
  }

  /**
   * Update camera position when camera attached to car
   */
  updateCarView() {
    const car = this.app.view.car.scene;
    const camera = this.app.view.camera;

    const x = car.position.x;
    const y = car.position.y + 1;
    const z = car.position.z;

    camera.position.set(x, y, z);
    camera.rotation.set(car.rotation.x, car.rotation.y, car.rotation.z);

    camera.lookAt(x, y, z);
  }
}
