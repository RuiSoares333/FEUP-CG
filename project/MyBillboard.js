import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyQuadTree } from './shapes/MyQuadTree.js';

export class MyBillboard extends CGFobject {
  constructor(scene, x, y, z) {
    super(scene);

    this.x = x;
    this.y = y;
    this.z = z;
  
    this.initBuffers();
    this.initMaterials();
  }
  initBuffers() {
    this.scene.Quad = new MyQuadTree(this.scene);
  }
  initMaterials() {
    let rand =  Math.floor(Math.random() * 3);
    console.log(rand);

    if(rand == 0) {
      this.billboardTexture = new CGFtexture(this.scene, 'images/tree1.png');
    }  
    else if(rand == 1) {
      this.billboardTexture = new CGFtexture(this.scene, 'images/tree2.png');
    }  
    else {
      this.billboardTexture = new CGFtexture(this.scene, 'images/tree3.png');
    }  
      
    this.billboardMaterial = new CGFappearance(this.scene);
    this.billboardMaterial.setTexture(this.billboardTexture);  
  }
  display() {

    const toCamera = vec3.create();
    //var cameraPos = this.scene.camera.position;
    var billPos = vec3.fromValues(this.x, 0, this.z);
    var camePos = vec3.fromValues(this.scene.camera.position[0], 0, this.scene.camera.position[2]);
    vec3.subtract(toCamera, camePos, billPos);
    vec3.normalize(toCamera, toCamera)

    var axis = vec3.create();
    var ang = Math.acos(vec3.dot(toCamera, vec3.fromValues(0, 0, 1)));
    vec3.cross(axis, vec3.fromValues(0, 0, 1), toCamera);
    vec3.normalize(axis, axis);

    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(ang, axis[0], axis[1], 0);
    this.scene.scale(10, 10, 10);
    this.billboardMaterial.apply();
    this.scene.Quad.display();
    this.scene.popMatrix();
  }
}