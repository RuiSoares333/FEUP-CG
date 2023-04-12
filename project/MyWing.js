import {CGFobject} from '../lib/CGF.js';
/**
 * MyWing
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyWing extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	    //0
			0, 0, 0.6,	    //1
			1, 0.2, 0.6,	//2
			1, 0.4, 0,	//3
            2, 0, 0.2,	    //4
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 3, 0,
            2, 4, 3,
            0, 2, 1,
			2, 0, 3,
            2, 3, 4,
            
		];

		//Facing Z positive
		this.normals = [
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
            0, 1, 0
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

