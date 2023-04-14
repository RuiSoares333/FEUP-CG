import {CGFobject} from '../../lib/CGF.js';

/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
          0, 0, 0,  // 0
          0, 0, 0.5,  // 1
          1, 0, 0.5,  // 2
          1, 0, 0   // 3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
          0, 1, 2,
          2, 3, 0,
          0, 2, 1,
          2, 0, 3
        ];
        
        this.normals = [
          0, 1, 0, // normal at vertex 0
          0, 1, 0, // normal at vertex 1
          0, 1, 0, // normal at vertex 2
          0, 1, 0  // normal at vertex 3
        ];

        this.texCoords = [
          0, 0, // texture coordinate for vertex 0
          0, 1, // texture coordinate for vertex 1
          1, 1, // texture coordinate for vertex 2
          1, 0  // texture coordinate for vertex 3
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}