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
                   0.5,  0.5,  0.5, //0                             
                   0.5,  0.5, -0.5, //1                                   
                   0.5, -0.5,  0.5, //2                                  
                   0.5, -0.5, -0.5, //3                                            
                  -0.5,  0.5,  0.5, //4                                  
                  -0.5,  0.5, -0.5, //5                                  
                  -0.5, -0.5,  0.5, //6                                  
                  -0.5, -0.5, -0.5, //7    
                                                     
                   0.5,  0.5,  0.5, //8 
                   0.5,  0.5, -0.5, //9 
                   0.5, -0.5,  0.5, //10
                   0.5, -0.5, -0.5, //11
                  -0.5,  0.5,  0.5, //12
                  -0.5,  0.5, -0.5, //13
                  -0.5, -0.5,  0.5, //14
                  -0.5, -0.5, -0.5, //15   

                   0.5,  0.5,  0.5, //16
                   0.5,  0.5, -0.5, //17
                   0.5, -0.5,  0.5, //18
                   0.5, -0.5, -0.5, //19
                  -0.5,  0.5,  0.5, //20
                  -0.5,  0.5, -0.5, //21
                  -0.5, -0.5,  0.5, //22
                  -0.5, -0.5, -0.5, //23

		];
 
		
            this.indices = [
                  1, 0, 2, 
                  1, 2, 3, 
                  
                  4, 5, 6, 
                  5, 7, 6, 
                  
                  8, 9, 13,  
                  13, 12, 8, 
                  
                  11, 10, 14,  
                  14, 15, 11, 
                  
                  18, 16, 20,
                  20, 22, 18,
                  
                  21, 17, 19, 
                  19, 23, 21  
            ];

            this.normals = [
                  1,0,0,
                  1,0,0,
                  1,0,0,
                  1,0,0,
                  -1,0,0,
                  -1,0,0,
                  -1,0,0,
                  -1,0,0,
                  
                  0,1,0,
                  0,1,0,
                  0,-1,0,
                  0,-1,0,
                  0,1,0,
                  0,1,0,
                  0,-1,0,
                  0,-1,0,
                  
                  0,0,1,
                  0,0,-1,
                  0,0,1,
                  0,0,-1,
                  0,0,1,
                  0,0,-1,
                  0,0,1,
                  0,0,-1
            ];
      
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

      /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
      this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

      // reinitialize buffers
      this.initBuffers();
      this.initNormalVizBuffers();
  }
}

