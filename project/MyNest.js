import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyHalfSphere } from './shapes/MyHalfSphere.js';
import { MyLid } from './shapes/MyLid.js';

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {

    constructor(scene) {
		super(scene);
		
		this.x = -75;
		this.y = 0;
		this.z = -90;
		this.defaultPos = [];
		this.eggs = []

		this.halfSphereBig = new MyHalfSphere(this.scene, 10, 30, 30, false, 2);
		this.halfSphereSmall = new MyHalfSphere(this.scene, 9, 30, 30, true, 2);
		this.lid = new MyLid(this.scene, 10, 9, 30);
		this.createDefaultPositions();

		this.nestTexture = new CGFtexture(this.scene, 'images/nest.jpg');
        this.material = new CGFappearance(this.scene);
		this.material.setAmbient(3, 3, 3, 3);
		this.material.setDiffuse(1, 1, 1, 1);
		this.material.setSpecular(1, 1, 1, 1);
		this.material.setShininess(100.0);
		this.material.setTextureWrap('REPEAT', 'REPEAT');
		this.material.setTexture(this.nestTexture);
	}

	display(){
		this.scene.pushMatrix();
			this.scene.translate(this.x, this.y - 2, this.z);
			this.material.apply();
			this.halfSphereBig.display();
			this.halfSphereSmall.display();
			this.lid.display();

			for(var i = 0; i < this.eggs.length; i++){
				this.eggs[i].display();
			}
		this.scene.popMatrix();

	}

	createDefaultPositions(){
		for (let x = -5; x <= 5; x += 5) {
			for (let z = -5; z <= 5; z += 5) {
			  this.defaultPos.push({ x, y: -2, z });
			}
		}
	}


	addEgg(newEgg){
		let newPos = this.defaultPos.shift();
		console.log(newPos)
		newEgg.x = newPos.x;
		newEgg.y = newPos.y;
		newEgg.z = newPos.z;
		this.eggs.push(newEgg);
		console.log(this.eggs);
	}
}