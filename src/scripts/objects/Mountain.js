import { Box3, MeshStandardMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Mountain {
    constructor(app) {
        this.app = app;
        this.init();
    }

    init() {
        const loader = new GLTFLoader();
        loader.load('./models/scene.glb', (gltf) => {
            const box = new Box3().setFromObject(gltf.scene);
            gltf.scene.scale.set(20, 20, 20);
            // gltf.scene.position.y = 10;
            this.app.view.scene.add(gltf.scene);
        });
    }
}