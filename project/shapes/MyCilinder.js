import {CGFobject} from '../../lib/CGF.js';

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
        this.texCoords=[];

        // Divide the circle by number of slices
        var ang=2*Math.PI/this.slices;
        var cilinderLength = 2;
        var cilinderRadius = 0.7;

        for(let j = 0; j <= this.stacks; j++) {
            for(let i= 0; i < this.slices; i++) {
                this.vertices.push(Math.cos(ang *i)*cilinderRadius, Math.sin(ang*i)*cilinderRadius, j*cilinderLength/this.stacks);
                this.normals.push(Math.cos(ang*i),Math.sin(ang*i),0);
                this.texCoords.push(i/this.slices, j/this.stacks);
            }
        }


        // Create vertices and normals for the top plane of the cylinder
        for(let i= 0; i < this.slices; i++) {
            this.vertices.push(Math.cos(ang *i)*cilinderRadius,Math.sin(ang*i)*cilinderRadius,cilinderLength);
            this.normals.push(0,0,1);
            this.texCoords.push(i/this.slices, 1);
        }

        // Create vertices and normals for the bottom plane of the cylinder
        for(let i= 0; i < this.slices; i++) {
            this.vertices.push(Math.cos(ang *i)*cilinderRadius,Math.sin(ang*i)*cilinderRadius,0);
            this.normals.push(0,0,-1);
            this.texCoords.push(i/this.slices, 0);
        }

        var totalPoints = this.stacks*this.slices;
        var topCenterIndex = totalPoints;
        var bottomCenterIndex = topCenterIndex + this.slices*2;
        this.vertices.push(0, 0, 1); // add top center vertex
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 1);
        this.vertices.push(0, 0, 0); // add bottom center vertex
        this.normals.push(0, 0, -1);
        this.texCoords.push(0.5, 0);

        // Create indices for the body of the cylinder
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

        // Create indices for the top plane of the cylinder
        for(let i= topCenterIndex; i < bottomCenterIndex - 1; i++) {
            this.indices.push(topCenterIndex, i, i+1);
        }

        // Create indices for the bottom plane of the cylinder
        for(let i= bottomCenterIndex; i < bottomCenterIndex + this.slices - 1; i++) {
            this.indices.push(i, bottomCenterIndex, i+1);
        }

    
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
  }
  
}