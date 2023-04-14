import {CGFobject} from '../../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []; // add texture coordinate array

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            // calculate vertex position
            var x = Math.cos(ang);
            var y = 0;
            var z = -Math.sin(ang);

            // calculate texture coordinates
            var s = i/this.slices;
            var t = 0;

            // add vertex, normal, and texture coordinate
            this.vertices.push(x, y, z);
            this.normals.push(x, Math.cos(Math.PI/4.0), z);
            this.texCoords.push(s, t);

            ang += alphaAng;
        }

        // add top vertex
        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);
        this.texCoords.push(0.5, 1);

        // add indices for triangles
        for(var i = 0; i < this.slices; i++){
            this.indices.push(i, (i+1) % this.slices, this.slices);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers(); // enable texture coordinates and pass to buffer
    }

}
