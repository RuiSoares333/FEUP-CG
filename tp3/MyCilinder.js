import {CGFobject} from '../lib/CGF.js';

/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCilinder extends CGFobject {
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

        // Divide the circle by number of slices
        var ang=2*Math.PI/this.slices;


        for(let j = 0; j <= this.stacks; j++) {
            for(let i= 0; i < this.slices; i++) {
                this.vertices.push(Math.cos(ang *i),Math.sin(ang*i),j*1/this.stacks);

                this.normals.push(Math.cos(ang*i),Math.sin(ang*i),0);
            }
        }

        var totalPoints = this.stacks*this.slices;

        for (let i = 0; i < totalPoints; i++ ) {
          if((i+1)%this.slices == 0) {
            this.indices.push(i, i+1-this.slices, i+1);
            this.indices.push(i, i+1, i+this.slices);
          }
          else {
            this.indices.push(i, i+1, i+1+this.slices);
            this.indices.push(i, i+1+this.slices, i+this.slices);
          }
        }
    
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}