import {
    ACESFilmicToneMapping, AmbientLight, AxesHelper, Clock,
    Color, DoubleSide, MathUtils, Mesh, MeshBasicMaterial, PerspectiveCamera,
    PlaneGeometry,
    Scene,
    sRGBEncoding, WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {FlyControls} from 'three/examples/jsm/controls/FlyControls';
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import { DEG2RAD } from "three/src/math/MathUtils";
import CustomSky from "./objects/CustomSky";
import RaceTrack from "./objects/RaceTrack";
import Car from "./objects/Car";
import {World} from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger'
import Mountain from "./objects/Mountain";

export default class WebGLView {
  constructor(app) {
    this.app = app;

    this.initThree();
    this.initObjects();
    this.initControls();
  }

  initThree() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.renderer = new WebGLRenderer();
    this.clock = new Clock();

    this.ambientLight = new AmbientLight(0xffffff);
    this.scene.add(this.ambientLight);



    this.scene.add(new AxesHelper(5000));

    this.camera.position.set(100, 200, 350);
    // this.camera.lookAt(3, 0, 500);

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5;
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
}

  initObjects() {
    const sky = new CustomSky(this.renderer, this.scene, this.app.gui.panel);
    sky.init();

    const raceTrack = new RaceTrack(this.app);
    const car = new Car(this.app);
    const mountian = new Mountain(this.app);

    const floorGem = new PlaneGeometry(700, 600, 1, 1);
    const floorMat = new MeshBasicMaterial({color: 0x00ff00});
    const floor = new Mesh(floorGem, floorMat);
    floor.material.side = DoubleSide;
    floor.rotation.x = MathUtils.degToRad(90);
    this.scene.add(floor);
  }

  update() {
    // this.controls.update(this.clock.getDelta());
    const delta = this.clock.getDelta();
    this.controls.update(delta);
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
