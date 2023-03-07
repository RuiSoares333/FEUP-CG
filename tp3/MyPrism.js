import {CGFobject} from '../lib/CGF.js';

/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {

        this.vertices =[];
        this.indices=[];
        this.normals=[];

        var ang=2*Math.PI/this.slices;

        for(let i=0; i < this.slices; i++) {
            this.vertices.push(Math.cos(ang *i), Math.sin(ang*i), 0);
            this.normals.push(0, 0, -1);
        }

        for(let i=0; i < this.slices; i++) {
            this.indices.push(i + 2 * this.slices, i, (i+1) % this.slices); 
        }

        for(let i=0; i < this.slices; i++) {
            this.vertices.push(Math.cos(ang *i), Math.sin(ang*i), 1);
            this.normals.push(0, 0, 1);
        }


        for(let j =0; j <= this.stacks; j++) {
            for(let i=0; i < this.slices; i++) {
                this.vertices.push(Math.cos(ang *i),Math.sin(ang*i),j*1/this.stacks);
                console.log(Math.cos(ang*i),Math.sin(ang*i),j*1/this.stacks);
                this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),j*1/this.stacks);
                console.log(Math.cos(ang*i+1),Math.sin(ang*i+1),j*1/this.stacks); 

                this.normals.push(Math.cos(ang*i+ang/2),Math.sin(ang*i+ang/2),0);
                this.normals.push(Math.cos(ang*i+ang/2),Math.sin(ang*i+ang/2),0);
            }
        }

        var totalPoints= 2*this.stacks*this.slices + 2*this.slices;

        for(let i=0; i < this.slices; i++) {
            this.indices.push(totalPoints + i, totalPoints + (i+1) % this.slices, totalPoints + 2 * this.slices);
        }

        for (let i =0; i < totalPoints; i+=2 ) {
            this.indices.push(i, i+1, i+1+this.slices*2);
            this.indices.push(i, i+1+this.slices*2, i+this.slices*2);
        }
    
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}