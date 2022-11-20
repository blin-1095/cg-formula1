import {
  ACESFilmicToneMapping,
  AmbientLight,
  AxesHelper, CameraHelper,
  Clock,
  Color,
  DoubleSide,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  sRGBEncoding,
  WebGLRenderer
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
import {TWEEN} from 'three/examples/jsm/libs/tween.module.min'
import {Controls} from "./controls/Controls";

export default class WebGLView {
  constructor(app) {
    this.app = app;

    this.raycaster = new Raycaster();
    this.sceneMeshes = [];

    this.initThree();
    this.initControls();
    this.initObjects();
  }

  initThree() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    this.renderer = new WebGLRenderer();
    this.clock = new Clock();

    this.ambientLight = new AmbientLight(0xffffff);
    this.scene.add(this.ambientLight);



    this.scene.add(new AxesHelper(5000));

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.3;

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
  }

  initControls() {
    this.controls = new Controls(this.app, this.camera, this.renderer, this.raycaster, this.sceneMeshes);
  }

  initObjects() {
    const sky = new CustomSky(this.renderer, this.scene, this.app.gui.panel);
    sky.init();

    const raceTrack = new RaceTrack(this.app);
    const car = new Car(this.app);
    const mountian = new Mountain(this.app);

    raceTrack.receiveShadow = true;

    const floorGem = new PlaneGeometry(700, 600, 1, 1);
    const floorMat = new MeshBasicMaterial({color: 0x00ff00});
    const floor = new Mesh(floorGem, floorMat);
    floor.material.side = DoubleSide;
    floor.rotation.x = MathUtils.degToRad(90);
    // this.scene.add(floor);
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
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
}
