import { MathUtils, Vector3 } from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import GLTFObject from "./GlftObject";

/**
 * Car represents the car object
 *
 * @version 1.0.0
 * @export
 * @class Car
 * @extends GLTFObject
 */
export default class Car extends GLTFObject {
  /**
   * Define waypoints and rotation needed to animate
   * the car along the track
   *
   * @memberof Car
   */
  animation = [
    { coords: new Vector3(3.2, 25.2, -9), rotation: { y: -1 } },
    { coords: new Vector3(3.2, 25.2, -33), rotation: { y: -1 } },
    { coords: new Vector3(-12.5, 25.2, -33), rotation: { y: -1 } },
    { coords: new Vector3(-12.5, 25.2, -22.5), rotation: { y: 1 } },
    { coords: new Vector3(-24, 25.2, -22.5), rotation: { y: -1 } },
    { coords: new Vector3(-24, 25.2, -15.75), rotation: { y: -1 } },
    { coords: new Vector3(-8, 25.2, -15.75), rotation: { y: 0 } },
    { coords: new Vector3(-4, 27, -15.75), rotation: { y: 0 } },
    { coords: new Vector3(11, 27, -15.75), rotation: { y: 0 } },
    { coords: new Vector3(15, 25.2, -15.75), rotation: { y: 0 } },
    { coords: new Vector3(25, 25.2, -15.75), rotation: { y: 1 } },
    { coords: new Vector3(25, 25.2, 2), rotation: { y: 1 } },
    { coords: new Vector3(-8, 25.2, 2), rotation: { y: 1 } },
    { coords: new Vector3(-8, 25.2, -9), rotation: { y: 1 } },
  ];

  /**
   * Represents the current animation state
   *
   * @memberof Car
   */
  currentAnimationStep = 0;

  /**
   * Create a new car instance
   *
   * @param {App} app Global application instance
   */
  constructor(app) {
    super(app, "./models/car.glb");
  }

  onLoaded(gltf) {
    // We set the initial position of our car instance
    gltf.scene.position.x = 3.2;
    gltf.scene.position.y = 25.2;
    gltf.scene.position.z = -24;

    // We rotate the car by 180deg to align it with the race track
    gltf.scene.rotateY(MathUtils.degToRad(180));

    // We scale the car to fit the size of the race track
    gltf.scene.scale.set(0.35, 0.35, 0.35);

    // We add the loaded car to the main application scene
    this.app.view.scene.add(gltf.scene);
    this.scene = gltf.scene;

    // We kips the first coordinate during the animation process because
    // the initial car position is between the first and last coordinate
    this.currentAnimationStep = 1;
  }

  animate() {
    const current = this.getCurrentAnimation();
    const next = this.getNextAnimation();

    const distance = current.coords.distanceTo(next.coords);
    const time = distance / 0.01;

    // Animation of the track route
    new TWEEN.Tween(this.scene.position)
      .to(current.coords, time)
      .onComplete(() => {
        this.currentAnimationStep++;
        if (this.animation.length == this.currentAnimationStep) {
          this.currentAnimationStep = 0;
        }
        this.animate();
      })
      .start();

    // Animation of the rotation for turns and rises
    new TWEEN.Tween(this.scene.rotation)
      .to(this.calcRotation(), time / 8)
      .delay((time / 8) * 7)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }

  getCurrentAnimation() {
    return this.animation[this.currentAnimationStep];
  }

  getNextAnimation() {
    if (this.currentAnimationStep + 1 == this.animation.length) {
      return this.animation[0];
    }
    return this.animation[this.currentAnimationStep + 1];
  }

  calcRotation() {
    const current = this.getCurrentAnimation();
    return {
      y: this.scene.rotation.y + (Math.PI / 2) * current.rotation.y,
    };
  }
}
