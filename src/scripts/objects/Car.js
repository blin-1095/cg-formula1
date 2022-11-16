import { Box3, MeshStandardMaterial, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {Body, Box, Sphere} from 'cannon-es'

export default class Car {
    constructor(app) {
        this.app = app;
        this.init()
    }

    init() {
        const loader = new GLTFLoader();
        loader.load('./models/car.glb', (gltf) => {
            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    const m = child;
                    m.receiveShadow = true;
                    m.castShadow = true;
                    m.material = new MeshStandardMaterial({ color: 0xff0000 });
                  }
            });
            const box = new Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new Vector3());
            gltf.scene.position.x += 30;
            gltf.scene.position.z += -130;
            gltf.scene.position.y += (gltf.scene.position.y + 5);
            this.app.view.scene.add(gltf.scene);
        });
    }
}