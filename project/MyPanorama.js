import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './shapes/MySphere.js';

export class MyPanorama {
  constructor(scene, texturePath) {
    this.scene = scene;
    this.texture = new CGFtexture(this.scene, texturePath);
    this.material = new CGFappearance(this.scene);
    this.material.setEmission(1, 1, 1, 1);
    this.material.setTexture(this.texture);

    this.sphere = new MySphere(this.scene, 300, 50, 50, true, 1);
  }

  // alterar o centro do panorama para onde está a camera
  display() {
    this.material.apply();
    this.scene.pushMatrix();
    this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
    this.scene.rotate(-Math.PI/2.0,1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.sphere.display();
    this.scene.popMatrix();
  }
}
