import { Box3, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class RaceTrack {
    constructor(app) {
        this.app = app;
        this.init();
    }

    init() {
        const loader = new GLTFLoader();
        loader.load('./models/race_track.glb', (gltf) => {
            const box = new Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new Vector3());
            gltf.scene.position.x += (gltf.scene.position.x - center.x);
            gltf.scene.position.z += (gltf.scene.position.x - center.z);
            this.app.view.scene.add(gltf.scene);
        });
    }
}