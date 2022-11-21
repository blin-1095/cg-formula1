import { GLTF, MeshPhongMaterial } from "three";
import { GLTFObject } from "./GlftObject";

export class Landscape extends GLTFObject {
  constructor(app, mixer) {
    super(app, "./models/landscape.glb");
    this.mixer = mixer;
  }

  /**
   *
   *
   * @param {GLTF} gltf
   * @memberof Landscape
   */
  onLoaded(gltf) {
    const s = 19.9;
    gltf.scene.scale.set(s, s, s);
    gltf.scene.position.set(0.2, 0.1, 0.1);

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const orgMat = child.material;
        const newMat = new MeshPhongMaterial();

        child.geometry.computeVertexNormals();
        newMat.map = orgMat.map;
        newMat.color = orgMat.color;

        child.material = newMat;
      }
    });

    this.app.view.scene.add(gltf.scene);

    gltf.animations.forEach((clip) => {
      this.mixer.clipAction(clip).play();
    });
  }
}
