/**
 * @module Objects
 */
import { MathUtils, Vector3 } from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import { GLTFObject } from "./GlftObject";
/**
 * Car represents the car object
 *
 * @version 1.0.0
 * @extends GLTFObject
 */
export class Car extends GLTFObject {
  /**
   * Define waypoints and rotation needed to animate
   * the car along the track
   *
   * @memberof Car
   * @access private
   */
  animation = [
    { coords: new Vector3(2.3, 25.2, -33.5), rotation: { y: 0 } },
    { coords: new Vector3(-1, 25.2, -36.9), rotation: { y: -1 } },
    { coords: new Vector3(-10, 25.2, -36.9), rotation: { y: 0 } },
    { coords: new Vector3(-13.55, 25.2, -34), rotation: { y: -1 } },
    { coords: new Vector3(-13.55, 25.2, -29), rotation: { y: 0 } },
    { coords: new Vector3(-17, 25.2, -25.8), rotation: { y: 1 } },
    { coords: new Vector3(-22, 25.2, -25.8), rotation: { y: 0 } },
    { coords: new Vector3(-25.5, 25.2, -23), rotation: { y: -1 } },
    { coords: new Vector3(-25.5, 25.2, -21), rotation: { y: 0 } },
    { coords: new Vector3(-22.5, 25.2, -18.6), rotation: { y: -1 } },
    { coords: new Vector3(-10.3, 25.2, -18.6), rotation: { y: 0 } }, // checkpoint up
    { coords: new Vector3(-5, 27, -18.6), rotation: { y: 0 } },
    { coords: new Vector3(9.8, 27, -18.6), rotation: { y: 0 } }, //checkpoint down
    { coords: new Vector3(14, 25.2, -18.6), rotation: { y: 0 } },
    { coords: new Vector3(21, 25.2, -18.6), rotation: { y: 0 } },
    { coords: new Vector3(24.4, 25.2, -16), rotation: { y: 1 } },
    { coords: new Vector3(24.4, 25.2, -4), rotation: { y: 0 } },
    { coords: new Vector3(21, 25.2, -0.9), rotation: { y: 1 } },
    { coords: new Vector3(-6.5, 25.2, -0.9), rotation: { y: 0 } },
    { coords: new Vector3(-9.25, 25.2, -3.8), rotation: { y: 1 } },
    { coords: new Vector3(-9.25, 25.2, -9.5), rotation: { y: 0 } },
    { coords: new Vector3(-6.5, 25.2, -12.3), rotation: { y: 1 } },
    { coords: new Vector3(-1, 25.2, -12.3), rotation: { y: 0 } },
    { coords: new Vector3(2.3, 25.2, -15), rotation: { y: -1 } },
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

  /** @inheritdoc */
  onLoaded(gltf) {
    // We set the initial position of our car instance
    gltf.scene.position.x = 2.3;
    gltf.scene.position.y = 25.2;
    gltf.scene.position.z = -26.3;

    // We rotate the car by 180deg to align it with the race track
    gltf.scene.rotateY(MathUtils.degToRad(180));

    // We scale the car to fit the size of the race track
    gltf.scene.scale.set(0.35, 0.35, 0.35);

    // We add the loaded car to the main application scene
    this.app.view.scene.add(gltf.scene);
    this.scene = gltf.scene;
  }

  /** @inheritdoc */
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
      .to(this.calcRotation(), time * 0.1)
      .delay(time / 2)
      .start();
  }

  /**
   * Returns the details like coordinates and rotation for the
   * current animation step
   *
   * @returns {object} current animation step details
   * @access private
   */
  getCurrentAnimation() {
    return this.animation[this.currentAnimationStep];
  }

  /**
   * Returns the details like coordinates and rotation for the
   * next animation step
   *
   * @returns {{coords: Vector3, rotation: {y: number}}} next animation step details
   * @access private
   */
  getNextAnimation() {
    if (this.currentAnimationStep + 1 == this.animation.length) {
      return this.animation[0];
    }
    return this.animation[this.currentAnimationStep + 1];
  }

  /**
   * Calculates the rotation coordinates for the current
   * animation step about 90deg in a specific direction
   *
   * @returns {{y: number}} new coordinates
   * @access private
   */
  calcRotation() {
    const current = this.getCurrentAnimation();
    return {
      y: this.scene.rotation.y + (Math.PI / 2) * current.rotation.y,
    };
  }
}
