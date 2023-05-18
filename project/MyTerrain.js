import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPlane} from './shapes/MyPlane.js';


export class MyTerrain extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.scene.plane = new MyPlane(this.scene,30);
		
		this.scene.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
		this.scene.texture = new CGFtexture(this.scene, "images/terrain.jpg");
		this.scene.terrainMap = new CGFtexture(this.scene, "images/terreninho.png");
		this.scene.altimetry = new CGFtexture(this.scene, "images/altimetry.png");
		this.scene.ogTerrainMap = new CGFtexture(this.scene, "images/heightmap_1.jpg")


		this.scene.shader.setUniformsValues({ uSamplerTerrain: 1 });
		this.scene.shader.setUniformsValues({ uSamplerHeight: 2 });
		this.scene.shader.setUniformsValues({ uSamplerAltimetry: 3 });
		this.scene.shader.setUniformsValues({ uSamplerOriginalHeight: 4 });
	}

	display() {
		this.scene.setActiveShader(this.scene.shader);
		this.scene.texture.bind(1);
		this.scene.terrainMap.bind(2);
		this.scene.altimetry.bind(3);
		this.scene.ogTerrainMap.bind(4);		

		this.scene.pushMatrix();
			this.scene.scale(400,400,400);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.plane.display();
		this.scene.popMatrix();

	}
}


