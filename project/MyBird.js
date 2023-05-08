import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MySphere } from "./shapes/MySphere.js";
import { MyCone } from './shapes/MyCone.js';
import { MyWing } from './shapes/MyWing.js';

const wingStr = 0.2;
const airRes = -0.01;
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
        this.initObjects(20);
        this.setPosition();

        this.velocityCap = 0.3;
    }

    initTextures(){
        // Initialize textures
        this.wingsTexture = new CGFtexture(this.scene, 'images/feathers_wings.png');
        this.bodyTexture = new CGFtexture(this.scene, 'images/feathers_body.png');
        
        this.beakTexture = new CGFtexture(this.scene, 'images/gold.jpg');
        this.eyeTexture = new CGFtexture(this.scene, 'images/dark_blue.jpg');

        this.material = new CGFappearance(this.scene);
        this.material.setEmission(0.5, 0.5, 0.5, 0.5);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    initObjects(c){
        //Initialize scene objects
        this.head = new MySphere(this.scene, 1, c, c, false, 1); // HEAD
        this.beak = new MyCone(this.scene, c, c); // BEAK
        this.lEye = new MySphere(this.scene, 1, c, c, false, 1); // LEFT EYE
        this.rEye = new MySphere(this.scene, 1, c, c, false, 1); // RIGHT EYE

        // this.torso = new MyCilinder(this.scene, 20, 20); // TORSO
        this.torso = new MySphere(this.scene, 1, c, c, false, 1.5); // RIGHT EYE
        this.lWing = new MyWing(this.scene, this); // LEFT WING
        this.rWing = new MyWing(this.scene, this); // RIGHT WING

        this.lTail = new MyWing(this.scene, this); // LEFT TAIL
        this.rTail = new MyWing(this.scene, this); // RIGHT TAIL
    }


    display(){
        this.velocityCap = 0.3 * this.scene.speedFactor;
        const time = Date.now() / 200 * this.scene.speedFactor;

        // Calculate the vertical displacement using a sine function
        const displacement = Math.sin(time) * 0.25; // Maximum displacement of 0.25      

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

            // LEFT EYE
            this.scene.pushMatrix();
            this.scene.scale(0.2, 0.2, 0.2);
            this.scene.translate(-5, 5, 0);
            this.material.setTexture(this.eyeTexture);
            this.material.apply();
            this.lEye.display();
            this.scene.popMatrix();

            // RIGHT EYE
            this.scene.pushMatrix();
            this.scene.scale(0.2, 0.2, 0.2);
            this.scene.translate(5, 5, 0);
            this.rEye.display();
            this.scene.popMatrix();

            // TORSO
            this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.6);
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
            this.material.setTexture(this.wingsTexture);
            this.material.apply();
            this.lWing.display();
            this.scene.popMatrix();

            // RIGHT WING
            this.scene.pushMatrix();
            this.scene.translate(0.5, 0, 0.5);
            this.material.setTexture(this.wingsTexture);
            this.material.apply();
            this.rWing.display();
            this.scene.popMatrix();

            // LEFT TAIL
            this.scene.pushMatrix();
            this.scene.translate(0, 0, 2);
            this.scene.rotate(-120* toRadians, 0, 1, 0);
            this.scene.scale(0.6, 0.5, 0.5);
            this.material.setTexture(this.wingsTexture);
            this.material.apply();
            this.lTail.display();
            this.scene.popMatrix();

            // RIGHT TAIL
            this.scene.pushMatrix();
            this.scene.scale(-1, 1, 1);
            this.scene.translate(0, 0, 2);
            this.scene.rotate(-120* toRadians, 0, 1, 0);
            this.scene.scale(0.6, 0.5, 0.5);
            this.material.setTexture(this.wingsTexture);
            this.material.apply();
            this.rTail.display();
            this.scene.popMatrix();

        // ---- END Primitive drawing section

        this.scene.popMatrix();
    }


    // get
    getPosition(){
        return [this.x, this.y, this.z];
    }

    getOrientation(){
        var z = Math.cos(this.angle);
        var x = Math.sin(this.angle);
        return [x, 0, z];
    }

    // set / update / handler
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
        const finalVelocity = this.velocity + newVelocity * this.scene.speedFactor;

        if(finalVelocity > this.velocityCap)
            this.velocity = this.velocityCap;
        
        else if(finalVelocity < 0)
            this.velocity = 0;
        
        else
            this.velocity = finalVelocity;
    }

    fly(wingStr){
        this.y += wingStr;
    }

    movementHandler(pressedKeys){
        var reset = pressedKeys.includes("R");
        var forward = pressedKeys.includes("W");
        var backward = pressedKeys.includes("S");
        var left = pressedKeys.includes("A");
        var right = pressedKeys.includes("D");
        var up = pressedKeys.includes("U");
        var down = pressedKeys.includes("X");

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

        if(up && down){
            // do nothing
        }
        else if(up){
            this.fly(wingStr);
        }
        else if(down){
            this.fly(-wingStr);
        }
    }

}