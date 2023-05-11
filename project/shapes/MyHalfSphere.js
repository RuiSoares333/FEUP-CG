import { CGFobject } from '../../lib/CGF.js';

/**
 * MyHalfSphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHalfSphere extends CGFobject {

    constructor(scene, radius, slices, stacks, invert, stretch) {
		super(scene);
		this.radius = radius;
		this.slices = slices;
		this.stacks = stacks;
		this.invert = invert;
		this.stretch = stretch;
		this.initBuffers();
	}

	initBuffers(){
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

        var alphaAng = 2*Math.PI/this.slices;
        var betaAng = Math.PI/this.stacks;
    
        for (var i = this.stacks/2; i <= this.stacks * 0.6; i++) {
            var beta = i * betaAng;
    
            for (var j = 0; j <= this.slices; j++) {
                var alpha = j * alphaAng;
    
                var x = Math.cos(alpha) * Math.sin(beta);
                var y = Math.cos(beta);
                var z = Math.sin(alpha) * Math.sin(beta);
    
                this.vertices.push(this.radius * z, this.radius * y, this.radius * x);
                this.normals.push(z, y, x);
                this.texCoords.push(j / this.slices, i / this.stacks);
            }
        }

        // Add vertices for the circular base
        var baseCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, this.radius * Math.cos(this.stacks * 0.6 * betaAng), 0);
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 0.5);

        for (var j = 0; j < this.slices; j++) {
            var alpha = j * alphaAng;
            var x = Math.cos(alpha) * Math.sin(this.stacks * 0.6 * betaAng);
            var y = Math.cos(this.stacks * 0.6 * betaAng);
            var z = Math.sin(alpha) * Math.sin(this.stacks * 0.6 * betaAng);
            this.vertices.push(this.radius * z, this.radius * y, this.radius * x);
            this.normals.push(0, -1, 0);
            this.texCoords.push(0.5 + 0.5 * x, 0.5 + 0.5 * z);
        }
    
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < this.slices; j++) {
                var a = i * (this.slices) + j;
                var b = a + this.slices + 1;
    
                if(this.invert){
                    this.indices.push(a + 1, b, a);
                    this.indices.push(a + 1, b + 1, b);                 
                }
                else {
                    this.indices.push(a, b, a + 1);
                    this.indices.push(b, b + 1, a + 1);    
                }   
            }
        }

        // Add indices for the circular base
        for (var j = 0; j < this.slices; j++) {
            var a = baseCenterIndex + j + 1;
            var b = baseCenterIndex + ((j + 1) % this.slices) + 1;
            if (this.invert) {
                this.indices.push(baseCenterIndex, a, b);
            } else {
                this.indices.push(baseCenterIndex, b, a);
            }
        }
    
        if (this.invertFaces) {
            for (var i = 0; i < this.normals.length; i += 3) {
                this.normals[i] *= -1;
                this.normals[i + 1] *= -1;
                this.normals[i + 2] *= -1;
            }
        }
    

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

}