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
		
		this.halfSphereSmall = new MyHalfSphere(this.scene, 15, 30, 30, true, 2);
		this.halfSphereBig = new MyHalfSphere(this.scene, 16, 30, 30, false, 2);
		this.lid = new MyLid(this.scene, 16, 15, 30);

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
			this.scene.translate(-75, 4, -90);
			this.material.apply();
			this.halfSphereSmall.display();
			this.halfSphereBig.display();
			this.lid.display();
		this.scene.popMatrix();
	}
}