import {
  ACESFilmicToneMapping,
  Clock,
  Color,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from "three";
import { ControlManager } from "./ControlManager";
import { LightsManager } from "./LightsManager";
import { Car } from "./objects/Car";
import { House } from "./objects/House";
import { Landscape } from "./objects/Landscape";
import { Track } from "./objects/Track";
import Windmill from "./objects/Windmill";

export default class WebGLView {
  constructor(app) {
    this.app = app;

    this.renderer = this.createRenderer();
    this.scene = this.createScene();
    this.camera = this.createCamera();
    this.clock = new Clock();

    this.initObjects();

    this.controls = new ControlManager(
      this.app,
      this.renderer,
      this.camera,
      this.app.gui.panel
    );

    this.lights = new LightsManager(this.scene, this.app.gui.panel);
  }

  createRenderer() {
    const renderer = new WebGLRenderer();
    renderer.outputEncoding = sRGBEncoding;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    return renderer;
  }

  createScene() {
    const scene = new Scene();
    scene.background = new Color("#80e5ff");
    return scene;
  }

  createCamera() {
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.set(0, 120, 0);
    camera.lookAt(0, 100, 0);
    return camera;
  }

  initObjects() {
    this.track = new Track(this.app);
    this.car = new Car(this.app);
    this.landscape = new Landscape(this.app);
    this.windmill = new Windmill(this.app);
    this.house = new House(this.app);
  }

  update() {
    const delta = this.clock.getDelta();
    this.controls.update(delta);

    this.windmill.update(delta);
    this.landscape.update(delta);

    this.camera.updateProjectionMatrix();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onResize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix;

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
}
