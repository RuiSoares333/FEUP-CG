import {CGFobject} from '../../lib/CGF.js';
import { MyQuad } from '../shapes/MyQuad.js';
import { MyTriangle } from '../shapes/MyTriangle.js';

var squareWingAngle = 5;
var triangleWingAngle = -10;
var multiplier = -0.25;
const wingSpeed = 0.04;
const toRadians = Math.PI / 180;

/**
 * MyWing
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyWing extends CGFobject {
	constructor(scene, bird) {
		super(scene);
		this.bird = bird;
		
		//Initialize scene objects
		this.square = new MyQuad(this.scene);
		this.triangle = new MyTriangle(this.scene);
	}

	display(){

		//Update the wing angle
		if(squareWingAngle > 30){
			squareWingAngle = 30;
			triangleWingAngle = -10;
			multiplier = -0.25;
		}
		else if(squareWingAngle < 5){
			squareWingAngle = 5;
			triangleWingAngle = -70;
			multiplier = 0.25;
		}

		var velocityMod = 1 + this.bird.velocity / this.bird.velocityCap;
		squareWingAngle += this.scene.speedFactor * this.scene.deltaTime * wingSpeed * multiplier * velocityMod;
		triangleWingAngle += this.scene.speedFactor * this.scene.deltaTime * wingSpeed * multiplier * 2.4 * velocityMod;


		// Calculate the wing position and rotation
		var squareRadianAngle = squareWingAngle * toRadians;
		var triangleRadianAngle = triangleWingAngle * toRadians;
		var wingX = Math.abs(Math.cos(squareRadianAngle));
		var wingY = Math.abs(Math.sin(squareRadianAngle));
		var wingRotation = squareRadianAngle;

		
		// ---- BEGIN Primitive drawing section

		// SQUARE
		this.scene.pushMatrix();
			this.scene.rotate(wingRotation, 0, 0, 1);
			this.square.display();
		this.scene.popMatrix();

		// TRIANGLE WING
		this.scene.pushMatrix();
			this.scene.translate(wingX,  wingY, 0);
			this.scene.rotate(triangleRadianAngle, 0, 0, 1);
			this.triangle.display();
		this.scene.popMatrix();

		// ---- END Primitive drawing section

	}
}

