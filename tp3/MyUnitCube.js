import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	updateBuffers(){
                
	}
	
	initBuffers() {
        this.vertices = [
            // Face 1
            0, 1, 1,
            1, 1, 1,
            1, 0, 1,
            0, 0, 1,
            // Face 2
            0, 1, 0,
            1, 1, 0,
            1, 1, 1,
            0, 1, 1,
            // Face 3
            1, 1, 1,
            1, 1, 0,
            1, 0, 0,
            1, 0, 1,
            // Face 4
            0, 0, 1,
            1, 0, 1,
            1, 0, 0,
            0, 0, 0,
            // Face 5
            0, 1, 0,
            0, 1, 1,
            0, 0, 1,
            0, 0, 0,
            // Face 6
            1, 1, 0,
            0, 1, 0,
            0, 0, 0,
            1, 0, 0
        ];

        //Counter-clockwise reference of vertices - right hand rule
        this.indices = [
            // Face 1
            0, 2, 1,
            0, 3, 2,
            // Face 2
            4, 6, 5,
            4, 7, 6,
            // Face 3
            8, 10, 9,
            8, 11, 10,
            // Face 4
            12, 14, 13,
            12, 15, 14,
            // Face 5
            16, 18, 17,
            16, 19, 18,
            // Face 6
            20, 22, 21,
            20, 23, 22,
        ];

        this.normals = [
            // Face 1
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // Face 2
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            // Face 3
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // Face 4
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            // Face 5
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            // Face 6
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}