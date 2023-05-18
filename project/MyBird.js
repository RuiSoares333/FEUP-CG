import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MySphere } from "./shapes/MySphere.js";
import { MyCone } from './shapes/MyCone.js';
import { MyWing } from './shapes/MyWing.js';
import { MyEgg } from './shapes/MyEgg.js';
import { MyBirdEgg } from './MyBirdEgg.js';

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

    state = {
        FLY: "fly",
        DOWN: "down movement to pick egg",
        UP: "upward movement to pick egg up"
    }

    constructor(scene) {
        super(scene);

        this.initTextures();
        this.initObjects(20);
        this.setPosition();
        this.currentState = this.state.FLY;

        this.velocityCap = 0.25;
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

        this.torso = new MyEgg(this.scene, 1, c, c, false, 2); // TORSO
        this.lWing = new MyWing(this.scene, this); // LEFT WING
        this.rWing = new MyWing(this.scene, this); // RIGHT WING

        this.lTail = new MyWing(this.scene, this); // LEFT TAIL
        this.rTail = new MyWing(this.scene, this); // RIGHT TAIL
        this.initEggs();
    }

    initEggs(){
        this.nEggs = 9;
        this.eggs = [];
        
        for (var i = 0; i < this.nEggs; i++) {
            this.eggs.push(new MyBirdEgg(this.scene, 1, 30, 30, this));
        }
    }

    drawShapes(){
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
                this.scene.translate(0, 0, 2.5);
                this.scene.rotate(-120* toRadians, 0, 1, 0);
                this.scene.scale(0.6, 0.5, 0.5);
                this.material.setTexture(this.wingsTexture);
                this.material.apply();
                this.lTail.display();
            this.scene.popMatrix();

            // RIGHT TAIL
            this.scene.pushMatrix();
                this.scene.scale(-1, 1, 1);
                this.scene.translate(0, 0, 2.5);
                this.scene.rotate(-120* toRadians, 0, 1, 0);
                this.scene.scale(0.6, 0.5, 0.5);
                this.material.setTexture(this.wingsTexture);
                this.material.apply();
                this.rTail.display();
            this.scene.popMatrix();

        // ---- END Primitive drawing section
    }

    getDisplacement(){
        const time = Date.now() / 200 * this.scene.speedFactor;

        switch (this.currentState){
            case this.state.FLY :
                // Calculate the vertical displacement using a sine function
                this.displacement = Math.sin(time) * 0.3; // Maximum displacement of 0.03
                break;
            case this.state.DOWN:
                if(this.displacement <= -3){
                    this.pickEgg();
                    if(this.eggs.length > 0 &&this.eggs[0].eggDistance <= 7){
                        this.eggs[0].followBird();
                    }
                    this.currentState = this.state.UP;
                    break;
                }
                this.displacement -= 0.25;
                break;
            case this.state.UP:
                if(this.displacement >= 0){
                    this.currentState = this.state.FLY;
                    break;
                }
                this.displacement += 0.25;
                break;
            default:
                break;
        }
        return 0;

    }

    display(){
        this.velocityCap = 0.3 * this.scene.speedFactor;
        this.getDisplacement();

        // Translate the bird object by the displacement
        this.scene.pushMatrix();

            this.scene.translate(this.x, this.y + this.displacement, this.z);
            this.scene.rotate(this.angle, 0, 1, 0);
            this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
            this.drawShapes();
        
        this.scene.popMatrix();

        for (var i = 0; i < this.eggs.length; i++) {
            this.eggs[i].display();
        }
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

    setPosition(){
        this.x = 0;
        this.y = 3;
        this.z = 0;
        this.angle = 0;
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
        if(this.y >= 3){
            this.pickUpAction = false;
        }
        else if (this.y <= 0){
            
        }
        this.y += wingStr;
    }

    pickEgg(){

        for (var i = 0; i < this.eggs.length; i++) {
            var xDis = Math.pow(Math.abs(this.x - this.eggs[i].x), 2); 
            var zDis = Math.pow(Math.abs(this.z - this.eggs[i].z), 2); 
            var total = Math.pow(xDis + zDis, 0.5);

            this.eggs[i].eggDistance = total;
            if(total <= 7){
                this.eggs.sort((a,b) => a.eggDistance - b.eggDistance);
            }
        }

    }

    movementHandler(pressedKeys){
        var reset = pressedKeys.includes("R");
        var forward = pressedKeys.includes("W");
        var backward = pressedKeys.includes("S");
        var left = pressedKeys.includes("A");
        var right = pressedKeys.includes("D");
        var pickUp = pressedKeys.includes("P");
        var drop = pressedKeys.includes("O");
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
        } else if(left){
            this.turn(angleTurn);
        } else if(right){
            this.turn(-angleTurn);
        }


        if(this.currentState !== this.state.FLY) return;

        if(pickUp){
            this.currentState = this.state.DOWN;
            this.pickEgg();
        }

        if(drop){
            this.eggs[0].drop();
        }

        // Up and Down
        if(up && down){
            // do nothing
        } else if(up){
            this.fly(wingStr);
        } else if(down){
            this.fly(-wingStr);
        }

    }

}