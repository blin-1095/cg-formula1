import {
  CameraHelper,
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  Scene,
} from "three";
import { Pane } from "tweakpane";

/**
 * LightsManager handles all lights for the whole scene
 *
 * @version 1.0.0
 */
export class LightsManager {
  /**
   * Create a new instance of LightsManager
   *
   * @memberof LightsManager
   * @access public
   * @param {Scene} scene Scene in which the lights are to be placed
   * @param {Pane} [panel] Control pane in which the settings are to be registered
   */
  constructor(scene, panel) {
    this.scene = scene;
    this.panel = panel;

    this.registerHemisphereLight();
    this.registerDirectionalLight();
    // this.registerHouseBedroomLights();

    if (panel) {
      this.hasDirectionalLightHelper = false;
      this.registerControls(panel);
    }
  }

  /**
   * Setup the hemisphere light
   *
   * @memberof LightsManager
   * @see {@link https://threejs.org/docs/#api/en/lights/HemisphereLight} HemisphereLight documentation
   */
  registerHemisphereLight() {
    this.hemisphereLight = new HemisphereLight(0xffffff, 0x303030, 0.5);
    this.hemisphereLight.position.set(0, 500, 0);
    this.scene.add(this.hemisphereLight);
  }

  /**
   * Activate day lights
   */
  setDay() {
    this.hemisphereLight.intensity = 0.5;
    this.hemisphereLight.color = new Color("#fff");
    this.directionalLight.intensity = 1.3;
  }

  /**
   * Activate night lights
   */
  setNight() {
    this.hemisphereLight.color = new Color("#303030");
    this.hemisphereLight.intensity = 0.1;
    this.directionalLight.intensity = 0.5;
  }

  /**
   * Setup the directional light
   *
   * @memberof LightsManager
   * @see {@link https://threejs.org/docs/#api/en/lights/DirectionalLight} DirectionalLight documentation
   */
  registerDirectionalLight() {
    this.directionalLight = new DirectionalLight(0xffffff, 1.3);

    // set position
    this.directionalLight.position.set(0, 200, -200);
    this.directionalLight.lookAt(0, 0, 0);

    // configure shadow
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.bias = -0.0001;
    this.directionalLight.shadow.mapSize.width = 1024 * 4;
    this.directionalLight.shadow.mapSize.height = 1024 * 4;
    this.directionalLight.shadow.bias = -0.001;

    // configure shadow camera view
    const viewportSize = 180;
    this.directionalLight.shadow.camera.left = -viewportSize;
    this.directionalLight.shadow.camera.right = viewportSize;
    this.directionalLight.shadow.camera.top = viewportSize;
    this.directionalLight.shadow.camera.bottom = -viewportSize;

    // init helper
    this.directionalLightHelper = new DirectionalLightHelper(
      this.directionalLight
    );
    this.directionalLightHelper.name = "DirectionalLightHelper";
    this.cameraHelper = new CameraHelper(this.directionalLight.shadow.camera);
    this.cameraHelper.name = "LightCameraHelper";
    this.scene.add(this.directionalLight);
  }

  /**
   * Setup attributes for the global control panel
   *
   * @param {Pane} panel - Instance of the global control panel
   * @memberof LightsManager
   */
  registerControls(panel) {
    const folder = panel.addFolder({ title: "Licht" });
    folder
      .addInput(this, "hasDirectionalLightHelper", {
        label: "Directional Light Helper",
      })
      .on("change", this.toggleDirectionalLightHelper.bind(this));

    folder.addSeparator();
    folder.addButton({ title: "Tag" }).on("click", this.setDay.bind(this));
    folder.addButton({ title: "Nacht" }).on("click", this.setNight.bind(this));
  }

  // registerHouseBedroomLights() {
  //   console.log(1);
  //   const light = new PointLight(0xffffff, 1, 100);
  //   light.position.set(18.55, 27.15, -33.9);
  //   light.castShadow = true;

  //   light.shadow.mapSize.width = 2048; // default
  //   light.shadow.mapSize.height = 2058; // default
  //   light.shadow.camera.near = 0.1; // default
  //   light.shadow.camera.far = 500; // default

  //   const h = new PointLightHelper(light);
  //   this.scene.add(h);

  //   const geometry = new SphereGeometry(0.05, 32, 32);
  //   const material = new MeshToonMaterial({
  //     color: 0x777777,
  //   });
  //   const sphere = new Mesh(geometry, material);
  //   sphere.position.set(18.55, 27.15, -33.9);
  //   this.scene.add(sphere);
  // }

  /**
   * Toggle the directional light helper
   *
   * @return {void}
   * @memberof LightsManager
   */
  toggleDirectionalLightHelper() {
    if (this.hasDirectionalLightHelper) {
      this.scene.add(this.directionalLightHelper);
      this.scene.add(this.cameraHelper);
      return;
    }

    const helper = this.scene.getObjectByName("DirectionalLightHelper");
    const cameraHelper = this.scene.getObjectByName("LightCameraHelper");
    this.scene.remove(helper);
    this.scene.remove(cameraHelper);
  }
}
