import {
  ACESFilmicToneMapping,
  AnimationMixer,
  AxesHelper,
  Clock,
  Color,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  Vector3,
  WebGLRenderer,
} from "three";
import { ControlManager } from "./ControlManager";
import { LightsManager } from "./LightsManager";
import { Car } from "./objects/Car";
import { House } from "./objects/House";
import { Landscape } from "./objects/Landscape";
import { Track } from "./objects/Track";
import { Windmill } from "./objects/Windmill";
import { Grass } from "./objects/Grass"

const c = new Vector3(0, 100, -20);

export default class WebGLView {
  constructor(app) {
    this.app = app;

    this.renderer = this.createRenderer();

    this.initThree();
    this.initObjects();
    this.initGrass();

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

  initThree() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );

    this.clock = new Clock();
    this.mixer = new AnimationMixer(this.scene);

    this.scene.add(new AxesHelper(5000));
    this.scene.background = new Color("#80e5ff");

    this.camera.position.set(c.x, c.y + 20, c.z);
    this.camera.lookAt(c);
  }

  initObjects() {
    this.track = new Track(this.app);
    this.car = new Car(this.app);
    this.landscape = new Landscape(this.app, this.mixer);
    this.windmill = new Windmill(this.app, this.mixer);
    this.house = new House(this.app);
  }

  initGrass() {
    this.grass0 = new Grass(this.scene, -10, 24.5, 0);
    this.grass1 = new Grass(this.scene, -25, 24.5, 0);
  }

  update() {
    const delta = this.clock.getDelta();
    this.controls.update(delta);
    this.mixer.update(delta);
    this.windmill.update(delta);
    this.camera.updateProjectionMatrix();
    this.grass0.animate(this.clock.getElapsedTime());
    this.grass1.animate(this.clock.getElapsedTime());

    // console.log(this.camera.position);
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
