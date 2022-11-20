import {Box3, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

export default class Mountain {
    constructor(app) {
        this.app = app;
        this.init();
    }

    init() {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./draco/');
        loader.setDRACOLoader(dracoLoader);
        loader.load('./models/compressedMountains.glb', (gltf) => {
            const box = new Box3().setFromObject(gltf.scene);
            gltf.scene.scale.set(20, 20, 20);
            // gltf.scene.position.y = 10;
            this.app.view.scene.add(gltf.scene);

            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })

        });
    }
}