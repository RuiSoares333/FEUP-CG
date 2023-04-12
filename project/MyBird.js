import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";
import { MyCilinder } from "./MyCilinder.js";
import { MyCone } from './MyCone.js';
import { MyWing } from './MyWing.js';

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

        // Initialize textures
        this.scene = scene;
        this.bodyTexture = new CGFtexture(this.scene, 'images/teal.jpg');
        this.beakTexture = new CGFtexture(this.scene, 'images/gold.jpg');
        this.eyeTexture = new CGFtexture(this.scene, 'images/dark_blue.jpg');

        this.material = new CGFappearance(this.scene);
        this.material.setEmission(0.5, 0.5, 0.5, 0.5);
        // this.birdMaterial.setTextureWrap('REPEAT', 'REPEAT');
        // BEAK TEXTURE

        //Initialize scene objects
        this.head = new MySphere(this.scene, 1, 4, 4); // HEAD
        this.beak = new MyCone(this.scene, 4, 4); // BEAK
        this.lEye = new MySphere(this.scene, 1, 4, 4); // LEFT EYE
        this.rEye = new MySphere(this.scene, 1, 4, 4); // RIGHT EYE

        this.torso = new MyCilinder(this.scene, 4, 4); // TORSO
        this.lWing = new MyWing(this.scene); // LEFT WING
        this.rWing = new MyWing(this.scene); // RIGHT WING

        this.lTail = new MyWing(this.scene); // LEFT TAIL
        this.rTail = new MyWing(this.scene); // RIGHT TAIL
    }

    display(){    

            // ---- BEGIN Primitive drawing section



            // HEAD
            this.scene.pushMatrix();
            this.scene.translate(0, 1, 0);
            this.material.setTexture(this.bodyTexture);
            this.material.apply();
            this.head.display();
            this.scene.popMatrix();

            // BEAK
            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 1);
            this.scene.translate(0, 2, -0.8);
            this.scene.rotate(-90*Math.PI/180, 1, 0, 0);
            this.material.setTexture(this.beakTexture);
            this.material.apply();
            this.beak.display();
            this.scene.popMatrix();

            // HEAD
            this.scene.pushMatrix();
            this.scene.scale(0.2, 0.2, 0.2);
            this.scene.translate(-5, 5, 0);
            this.material.setTexture(this.eyeTexture);
            this.material.apply();
            this.lEye.display();
            this.scene.popMatrix();

            // HEAD
            this.scene.pushMatrix();
            this.scene.scale(0.2, 0.2, 0.2);
            this.scene.translate(5, 5, 0);
            this.rEye.display();
            this.scene.popMatrix();

            // TORSO
            this.scene.pushMatrix();
            this.scene.translate(0, 0, 0);
            this.material.setTexture(this.bodyTexture);
            this.material.apply();
            this.torso.display();
            this.scene.popMatrix();

            // LEFT WING
            this.scene.pushMatrix();
            this.scene.translate(-0.5, 0, 0.5);
            this.scene.rotate(180*Math.PI/180, 1, 0, 0);
            this.scene.rotate(-180*Math.PI/180, 1, 0, 0);
            this.scene.scale(-1, 1, 1);
            this.lWing.display();
            this.scene.popMatrix();

            // RIGHT WING
            this.scene.pushMatrix();
            this.scene.translate(0.5, 0, 0.5);
            this.rWing.display();
            this.scene.popMatrix();

            // LEFT TAIL
            this.scene.pushMatrix();
            this.scene.translate(0, 0, 2);
            this.scene.rotate(-120*Math.PI/180, 0, 1, 0);
            this.scene.scale(1, 0.5, 0.5);
            this.lTail.display();
            this.scene.popMatrix();

            // RIGHT TAIL
            this.scene.pushMatrix();
            this.scene.scale(-1, 1, 1);
            this.scene.translate(0, 0, 2);
            this.scene.rotate(-120*Math.PI/180, 0, 1, 0);
            this.scene.scale(1, 0.5, 0.5);
            this.rTail.display();
            this.scene.popMatrix();

            // ---- END Primitive drawing section
    }

}