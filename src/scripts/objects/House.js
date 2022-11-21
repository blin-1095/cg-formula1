import { MathUtils } from "three";
import { GLTFObject } from "./GlftObject";

export class House extends GLTFObject {
  constructor(app) {
    super(app, "./models/house.glb");
  }

  onLoaded(gltf) {
    gltf.scene.position.set(20, 24, -30);
    gltf.scene.rotateY(MathUtils.degToRad(45));

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.app.view.scene.add(gltf.scene);
  }
}
