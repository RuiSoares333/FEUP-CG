import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            // Base de Baixo
            -0.5, -0.5, -0.5, // 0
            0.5, -0.5, -0.5,  // 1
            -0.5, 0.5, -0.5, // 2
            0.5, 0.5, -0.5, // 3
            // Base de Cima
            -0.5, -0.5, 0.5, // 4
            0.5, -0.5, 0.5,  // 5
            -0.5, 0.5, 0.5, // 6
            0.5, 0.5, 0.5 // 7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
                  
            // Face 1
		2, 1, 0,
		2, 3, 1,
            // Face 2
            4, 5, 7,
            7, 6, 4,
            // Face 3
            2, 6, 3,
            3, 6, 7,
            // Face 4
            0, 1, 5,
            0, 5, 4,
            // Face 5
            0, 4, 2,
            2, 4, 6,
            // Face 6
            1, 3, 7,
            1, 7, 5
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

