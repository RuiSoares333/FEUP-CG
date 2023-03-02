import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);

        this.faceA = new MyQuad(this.scene);
        this.faceB = new MyQuad(this.scene);
        this.faceC = new MyQuad(this.scene);
        this.faceD = new MyQuad(this.scene);
        this.faceE = new MyQuad(this.scene);
        this.faceF = new MyQuad(this.scene);

    }
    display() {
        
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.faceA.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.faceB.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(90.0*Math.PI/180.0, 1, 0, 0);
        this.faceC.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-90.0*Math.PI/180.0, 1, 0, 0);
        this.faceD.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(90.0*Math.PI/180.0, 0, 1, 0);
        this.faceE.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-90.0*Math.PI/180.0, 0, 1, 0);
        this.faceF.display();
        this.scene.popMatrix();
    }
}