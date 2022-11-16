import { MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Mountain {
    constructor(app) {
        this.app = app;
        this.init();
    }

    init() {
        const loader = new GLTFLoader();
        loader.load('./models/mountain.glb', (gltf) => {
            gltf.scene.traverse(child => {
                if(child.isMesh) {
                    const m = child;
                    m.receiveShadow = true;
                    m.castShadow = true;
                    m.material = new MeshStandardMaterial({color: 0x00ffff});
                    child.geometry.center();
                }
            });
            gltf.scene.position.z = -150;
            this.app.view.scene.add(gltf.scene);
        });
    }
}