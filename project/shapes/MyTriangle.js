import {CGFobject} from '../../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,
			0, 0, 0.5,
			0.75, 0, 0.5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 1
		];

		this.normals = [
			0, 1, 0, // normal at vertex 0
			0, 1, 0, // normal at vertex 1
			0, 1, 0  // normal at vertex 2
		];

		this.texCoords = [
			0, 0, // texture coordinate for vertex 0
			0, 1, // texture coordinate for vertex 1
			1, 1  // texture coordinate for vertex 2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

