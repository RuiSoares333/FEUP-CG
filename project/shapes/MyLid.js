import { CGFobject } from '../../lib/CGF.js';

/**
 * MyLid
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyLid extends CGFobject {

    constructor(scene, radius, innerRadius, slices) {
        super(scene);
        this.radius = radius;
        this.innerRadius = innerRadius;
        this.slices = slices;
        this.initBuffers();
    }


	initBuffers(){
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

        var alphaAng = (2*Math.PI) / this.slices;    

        for (var j = 0; j < this.slices*4; j++) {
            var alphaOne = j * alphaAng;
            var alphaTwo = (j + 1) * alphaAng;

            var xOne = Math.cos(alphaOne);
            var zOne = Math.sin(alphaOne);

            var xTwo = Math.cos(alphaTwo);
            var zTwo = Math.sin(alphaTwo);

            this.vertices.push(this.radius * zOne, 0, this.radius * xOne);
            this.vertices.push(this.radius * zTwo, 0, this.radius * xTwo);

            this.vertices.push(this.innerRadius * zTwo, 0, this.innerRadius * xTwo);
            this.vertices.push(this.innerRadius * zOne, 0, this.innerRadius * xOne);
            
            this.normals.push(0, 1, 0);
            this.texCoords.push(j / this.slices*4, 1);
        }

    
        for (var j = 0; j < this.slices*4; j+=4) {
            this.indices.push(j, j+1, j+2);
            this.indices.push(j+2, j+3, j);                 
        }
        
    

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

}