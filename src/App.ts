import {
  ACESFilmicToneMapping,
  AxesHelper,
  Color,
  HemisphereLight,
  Light,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { Sky } from "three/examples/jsm/objects/Sky";

let camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer;
const stats = Stats();

let sky: Sky, sun: Vector3;

const initSky = () => {
  sky = new Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);

  sun = new Vector3();

  const uniforms = sky.material.uniforms;
  uniforms["turbidity"].value = 0;
  uniforms["rayleigh"].value = 1.6;
  uniforms["mieCoefficient"].value = 0.005;
  uniforms["mieDirectionalG"].value = 0.7;

  const phi = MathUtils.degToRad(90 - 2);
  const theta = MathUtils.degToRad(180);

  sun.setFromSphericalCoords(1, phi, theta);

  uniforms["sunPosition"].value.copy(sun);

  renderer.toneMappingExposure = renderer.toneMappingExposure;
  renderer.render(scene, camera);
};

const init = () => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    300
  );
  camera.position.set(15, 5, 0);

  scene = new Scene();
  scene.background = new Color(0xdddddd);

  const loader = new GLTFLoader();
  loader.load("./textures/f1_car.glb", (gltf) => {
    gltf.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const m = child as Mesh;
        m.receiveShadow = true;
        m.castShadow = true;
        m.material = new MeshStandardMaterial({ color: 0xff0000 });
      }
      if ((child as Light).isLight) {
        const l = child as Light;
        l.castShadow = true;
        l.shadow.bias = -0.003;
        l.shadow.mapSize.width = 2048;
        l.shadow.mapSize.height = 2048;
      }
    });
    scene.add(gltf.scene);
    animate();
  });

  renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = sRGBEncoding;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", animate);
  controls.maxDistance = 20;
  controls.minDistance = 2;
  controls.target.set(0, 0, -0.2);
  controls.update();

  scene.add(new AxesHelper(100));

  const hemiLight = new HemisphereLight(0xffeeb1, 0x080820, 4);
  scene.add(hemiLight);

  window.addEventListener("resize", onWindowResize);

  initSky();

  document.body.appendChild(stats.dom);

  animate();
};

const onWindowResize = () => {
  camera.aspect = window.innerHeight / window.innerWidth;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerHeight, window.innerWidth);
  animate();
};

const animate = () => {
  stats.update();
  renderer.render(scene, camera);

  // requestAnimationFrame(animate);
};

init();
