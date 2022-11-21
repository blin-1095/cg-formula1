import { AnimationMixer, MathUtils } from "three";
import { GLTFObject } from "./GlftObject";

/**
 * Windmill represents the windmill object
 * @version 1.0.0
 * @class Windmill
 * @extends GLTFObject
 */
export class Windmill extends GLTFObject {
  constructor(app) {
    super(app, "./models/windmill.glb");
  }

  /** @inheritdoc */
  onLoaded(gltf) {
    gltf.scene.position.set(-15, 25, -4.5);
    gltf.scene.rotateY(MathUtils.degToRad(250));

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.mixer = new AnimationMixer(gltf.scene);

    this.mixer.clipAction(gltf.animations[0]).play();

    this.app.view.scene.add(gltf.scene);
  }

  update(delta) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }
}
