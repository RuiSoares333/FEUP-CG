import {CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MySphere } from './shapes/MySphere.js';

export class MyBirdEgg extends CGFobject {
	constructor(scene, radius, slices, stacks) {
		super(scene);
		this.radius = radius;
		this.slices = slices;
		this.stacks = stacks;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.droped = false;
		this.initBuffers();
	}

	initBuffers() {
		this.sphere = new MySphere(this.scene,1,30,30,false, 1.5)

    this.appearance = new CGFappearance(this.scene);
    this.appearance.setAmbient(1, 1, 1, 1);
    this.appearance.setDiffuse(1, 0.9, 0.9, 1);
    this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.appearance.setShininess(10.0);

		this.eggShader = new CGFshader(this.scene.gl, "shaders/egg.vert", "shaders/egg.frag");
		var temp = vec3.fromValues(0, 0, 0);


		this.eggShader.setUniformsValues({ aVertexPosition: temp });
		this.eggShader.setUniformsValues({ aVertexNormal: temp });
		this.eggShader.setUniformsValues({ uSampler2: 1 });

		this.scene.eggShader = this.eggShader;
	}

	updateBuffers() {

	}

	display(){
		this.scene.pushMatrix();

		this.scene.scale(0.7,0.7,0.7);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.appearance.apply();
		this.texture.bind(1);
		this.sphere.display();

		this.scene.popMatrix();
	}
}