import {Box3, MeshBasicMaterial, MeshPhongMaterial, Vector3} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class RaceTrack {
    constructor(app) {
        this.app = app;
        this.init();
    }

    init() {
        const loader = new GLTFLoader();
        loader.load('./models/track.glb', (gltf) => {
            gltf.scene.position.y = 14
            gltf.scene.position.x = -4;
            gltf.scene.position.z = -28;
            gltf.scene.scale.set(0.1, 0.1, 0.1);
            this.app.view.scene.add(gltf.scene);

            gltf.scene.position.y = 25;
            gltf.scene.position.x = -4;
            gltf.scene.position.z = -30;

            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
        });
    }
}