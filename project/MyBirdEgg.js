import {CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyEgg } from './shapes/MyEgg.js';

const toRadians = Math.PI / 180;

export class MyBirdEgg extends CGFobject {

	state = {
		NEST: "the egg is inside the nest",
		REST: "the egg is resting",
		BIRD: "the egg is attached to the bird",
		FALL: "the egg was dropped and is falling",
	}

	constructor(scene, radius, slices, stacks, bird) {
		super(scene);
		this.radius = radius;
		this.slices = slices;
		this.stacks = stacks;

		this.x = (Math.random() * 75) - 115;
		this.y = -4;
		this.z = (Math.random() * 75) - 120;
		this.velocity = 0;
		this.rotation = Math.floor(Math.random()*360) * toRadians;
		console.log(this.rotation);
		this.currentState = this.state.REST;

		this.bird = bird;
		this.egg = new MyEgg(this.scene, 1, 30, 30, false, 1.5);

		this.textEgg = new CGFtexture(this.scene, "images/kinder.png");
		this.texture = this.textEgg;


		this.droped = false;
		this.initBuffers();
	}

	initBuffers() {

		this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(1, 1, 1, 1);
		this.appearance.setDiffuse(1, 0.9, 0.9, 1);
		this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.appearance.setShininess(10.0);

		this.appearance.setTexture(this.textEgg);

		this.eggShader = new CGFshader(this.scene.gl, "shaders/egg.vert", "shaders/egg.frag");
		var temp = vec3.fromValues(0, 0, 0);


		this.eggShader.setUniformsValues({ aVertexPosition: temp });
		this.eggShader.setUniformsValues({ aVertexNormal: temp });
		this.eggShader.setUniformsValues({ uSampler2: 1 });

		this.scene.eggShader = this.eggShader;
	}

	dealWithState(){
		if(this.currentState === this.state.BIRD){
			this.x = this.bird.x;
			this.y = this.bird.displacement + this.bird.y - 1.5;
			this.z = this.bird.z;
		}
		else if(this.currentState === this.state.FALL){

			if(this.velocity - 0.005 > 0){
				this.velocity -= 0.005;
			} else {
				this.velocity = 0;
			}
			this.x -= Math.sin(this.angle) * (this.velocity);
			this.y -= 0.5;
			this.z -= Math.cos(this.angle) * (this.velocity);

			if(this.y <= -4){
				this.placeInNest();
			}
		}
	}

	display(){
		this.scene.pushMatrix();

			this.dealWithState();

			this.scene.translate(this.x, this.y, this.z);
			this.scene.rotate(this.rotation, 0, 1, 0);
			this.scene.rotate(- Math.PI / 2, 1, 0, 0);
			this.scene.scale(0.7,0.7,0.7);
			this.appearance.apply();
			this.texture.bind(1);
			this.egg.display();

		this.scene.popMatrix();
	}

	followBird(){
		this.currentState = this.state.BIRD;
	}

	placeInNest(){
		this.scene.nest.addEgg(this.bird.eggs.shift());
		this.currentState = this.state.NEST;
	}

	isCloseToNest(){
		var xVel = Math.cos(this.bird.angle) * this.bird.velocity / this.scene.speedFactor;
		var finalX = xVel * Math.pow(2*this.bird.y, 0.5);

		var zVel = Math.sin(this.bird.angle) * this.bird.velocity / this.scene.speedFactor;
		var finalZ = zVel * Math.pow(2*this.bird.y, 0.5);

		var xDis = Math.pow(this.scene.nest.x - (finalX + this.bird.x), 2);
		var zDis = Math.pow(this.scene.nest.z - (finalZ + this.bird.z), 2);

		var totalDist = Math.pow(xDis + zDis, 0.5);

		return totalDist <= 6.5;
	}

	drop(){
		if(this.currentState === this.state.BIRD && this.isCloseToNest()){
			this.angle = this.bird.angle;
			this.velocity = this.bird.velocity / this.scene.speedFactor;
			this.currentState = this.state.FALL;
		}
	}
}