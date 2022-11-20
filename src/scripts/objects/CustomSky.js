import {
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight, HemisphereLightHelper,
  MathUtils,
  PointLight, SpotLight,
  Vector3
} from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";

export default class CustomSky {
  constructor(renderer, scene, panel, options) {
    this.renderer = renderer;
    this.scene = scene;

    this.setDefaultOptions(options);
    this.init();
    if (panel) {
      this.initControls(panel);
    }
  }

  setDefaultOptions(options) {
    const defaultOptions = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 2,
      azimuth: 270,
    };

    this.options = Object.assign({}, defaultOptions, options);
    this.turbidity = this.options.turbidity;
    this.elevation = this.options.elevation;
    this.azimuth = this.options.azimuth;
  }

  init() {
    this.instance = new Sky();
    this.sun = new Vector3();
    this.instance.scale.setScalar(450000);

    const light = new DirectionalLight( 0xffffff );
    light.castShadow = true;
    light.shadow.mapSize.x = 4096
    light.shadow.mapSize.y = 4096
    light.shadowCameraLeft = -100;
    light.shadowCameraRight = 100;
    light.shadowCameraTop = 100;
    light.shadowCameraBottom = -100;
    this.light = light;
    // this.scene.add(new DirectionalLightHelper(this.light));
  this.light.position.set(0, 50, 0)
    this.scene.add(this.instance);
    this.scene.add(this.light);

    // this.updateOptions();
  }

  updateOptions() {
    const uniforms = this.instance.material.uniforms;
    uniforms["turbidity"].value = this.options.turbidity;
    uniforms["rayleigh"].value = this.options.rayleigh;
    uniforms["mieCoefficient"].value = this.options.mieCoefficient;
    uniforms["mieDirectionalG"].value = this.options.mieDirectionalG;

    const phi = MathUtils.degToRad(90 - this.options.elevation);
    const theta = MathUtils.degToRad(this.options.azimuth);
    this.sun.setFromSphericalCoords(1, phi, theta);
    uniforms["sunPosition"].value.copy(this.sun);
    this.light.position.set(this.sun.x, this.sun.y, this.sun.z);
  }

  initControls(panel) {
    const folder = panel.addFolder({ title: "Sonne" });
    folder
      .addInput(this, "turbidity", {
        label: "Trübheitsgrad",
        min: 0,
        max: 20,
        step: 1,
      })
      .on("change", this.onTurbidityChange.bind(this));
    folder
      .addInput(this, "elevation", { label: "Höhe", min: -5, max: 30, step: 1 })
      .on("change", this.onElevationChange.bind(this));
    folder
      .addInput(this, "azimuth", { label: "Azimut", min: 0, max: 360, step: 1 })
      .on("change", this.onAzimuthChange.bind(this));
  }

  onTurbidityChange({ value }) {
    this.options.turbidity = value;
    this.updateOptions();
  }

  onElevationChange({ value }) {
    this.options.elevation = value;
    this.updateOptions();
  }

  onAzimuthChange({ value }) {
    this.options.azimuth = value;
    this.updateOptions();
  }
}
