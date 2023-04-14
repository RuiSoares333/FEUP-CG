import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MySphere } from "./shapes/MySphere.js";
import { MyCilinder } from "./shapes/MyCilinder.js";
import { MyCone } from './shapes/MyCone.js';
import { MyWing } from './shapes/MyWing.js';

const wingStr = 0.5;
const airRes = -0.1;
const toRadians = Math.PI / 180;
const angleTurn = 5 * toRadians;

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {


    constructor(scene) {
        super(scene);

        this.initTextures();
        this.initObjects(4);
        this.setPosition();
    }

    initTextures(){
        // Initialize textures
        this.bodyTexture = new CGFtexture(this.scene, 'images/teal.jpg');
        this.beakTexture = new CGFtexture(this.scene, 'images/gold.jpg');
        this.eyeTexture = new CGFtexture(this.scene, 'images/dark_blue.jpg');

        this.material = new CGFappearance(this.scene);
        this.material.setEmission(0.5, 0.5, 0.5, 0.5);
        // this.birdMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initObjects(complexity){
        //Initialize scene objects
        this.head = new MySphere(this.scene, 1, complexity, complexity); // HEAD
        this.beak = new MyCone(this.scene, complexity, complexity); // BEAK
        this.lEye = new MySphere(this.scene, 1, complexity, complexity); // LEFT EYE
        this.rEye = new MySphere(this.scene, 1, complexity, complexity); // RIGHT EYE

        this.torso = new MyCilinder(this.scene, complexity, complexity); // TORSO
        this.lWing = new MyWing(this.scene); // LEFT WING
        this.rWing = new MyWing(this.scene); // RIGHT WING

        this.lTail = new MyWing(this.scene); // LEFT TAIL
        this.rTail = new MyWing(this.scene); // RIGHT TAIL
    }

    setPosition(){
        this.x = 0;
        this.y = 3;
        this.z = 0;
        this.angle = -90 * toRadians;
        this.velocity = 1;
    }

    update(){
        this.z -= Math.cos(this.angle) * (this.velocity);
        this.x -= Math.sin(this.angle) * (this.velocity);
    }

    turn(newAngle){
        this.angle += newAngle;
    }

    accelerate(newVelocity){
        const finalVelocity = this.velocity + newVelocity;

        if(finalVelocity > 10)
            this.velocity = 10;
        
        else if(finalVelocity < 0)
            this.velocity = 0;
        
        else
            this.velocity = finalVelocity;
    }

    movementHandler(pressedKeys){
        var reset = pressedKeys.includes("R");
        var forward = pressedKeys.includes("W");
        var backward = pressedKeys.includes("S");
        var left = pressedKeys.includes("A");
        var right = pressedKeys.includes("D");


        if(reset){
            this.setPosition();
        }

        // Forward / Backward Movement
        if((forward && backward) || (!forward && !backward)){
            this.accelerate(airRes);
        } 
        else if(forward){
            this.accelerate(wingStr);
        } 
        else if(backward){
            this.accelerate(-wingStr);
        }

        // Rotation
        if(left && right){
            // do nothing
        }
        else if(left){
            this.turn(angleTurn);
        }
        else if(right){
            this.turn(-angleTurn);
        }
    }


    display(){
        const time = Date.now()/ 200;

        // Calculate the vertical displacement using a sine function
        const displacement = Math.sin(time * this.scene.speedFactor) * 0.25; // Maximum displacement of 0.25      

        // Translate the bird object by the displacement
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y + displacement, this.z);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);

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
        this.scene.rotate(-90* toRadians, 1, 0, 0);
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
        this.scene.rotate(180* toRadians, 1, 0, 0);
        this.scene.rotate(-180* toRadians, 1, 0, 0);
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
        this.scene.rotate(-120* toRadians, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.lTail.display();
        this.scene.popMatrix();

        // RIGHT TAIL
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.translate(0, 0, 2);
        this.scene.rotate(-120* toRadians, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.rTail.display();
        this.scene.popMatrix();

        // ---- END Primitive drawing section

        this.scene.popMatrix();
    }

    getPosition(){
        return [this.x, this.y, this.z];
    }

    getOrientation(){
        var z = Math.cos(this.angle);
        var x = Math.sin(this.angle);
        return [x, 0, z];
    }

}