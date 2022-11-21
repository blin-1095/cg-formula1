import { GLTFObject } from "./GlftObject";

export class Track extends GLTFObject {
  constructor(app) {
    super(app, "./models/track.glb");
  }

  /** @inheritdoc */
  onLoaded(gltf) {
    gltf.scene.position.x = -4.9;
    gltf.scene.position.y = 24.7;
    gltf.scene.position.z = -33.4;
    gltf.scene.scale.set(0.1, 0.1, 0.1);

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.app.view.scene.add(gltf.scene);
  }
}
