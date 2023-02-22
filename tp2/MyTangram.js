import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyParalelogram } from "./MyParalelogram.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        //Initialize scene objects
        this.greenDiamond = new MyDiamond(this.scene);
        this.blueTriangle = new MyTriangle(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.yellowParallelogram = new MyParalelogram(this.scene);
        this.pinkTriangle = new MyTriangleBig(this.scene);
        this.redTriangle = new MyTriangle(this.scene);
        this.purpleTriangle = new MyTriangle(this.scene);
	}

    display(){
        
        var tra1 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            1, 5, 0, 1
          ]
          
          // ---- BEGIN Primitive drawing section
          this.scene.pushMatrix();
          this.scene.multMatrix(tra1);
          this.scene.setDiffuse(0,1,0,0);
          this.greenDiamond.display();
          this.scene.popMatrix();
          
      
          this.scene.pushMatrix();
          this.scene.translate(2, 2.9, 0);
          this.scene.scale(1.4, 1.4, 0);
          this.scene.setDiffuse(0, 155/255, 1, 0);
          this.blueTriangle.display();
          this.scene.popMatrix();
      
      
          this.scene.pushMatrix();
          this.scene.translate(0.55, 2.1, 0);
          this.scene.rotate(90*Math.PI/180, 0, 0, 1);
          this.scene.scale(1, 1, 0);
          this.scene.setDiffuse(1, 155/255, 0, 0);
          this.orangeTriangle.display();
          this.scene.popMatrix();
      
          this.scene.pushMatrix();
          this.scene.translate(2, -1.35, 0);
          this.scene.scale(-1, 1, 0);
          this.scene.rotate(45*Math.PI/180, 0, 0, 1);
          this.scene.setDiffuse(1, 1, 0, 0);
          this.yellowParallelogram.display();
          this.scene.popMatrix();
      
      
          this.scene.pushMatrix();
          this.scene.translate(-0.7, 0.1, 0);
          this.scene.scale(0.6, 0.6, 0);
          this.scene.setDiffuse(1, 155/255, 207/255, 0);
          this.pinkTriangle.display();
          this.scene.popMatrix();
      
      
          this.scene.pushMatrix();
          this.scene.translate(-2.1, 0, 0);
          this.scene.scale(0.7, 0.7, 0);
          this.scene.rotate(-90*Math.PI/180, 0, 0, 1);
          this.scene.setDiffuse(1, 0, 0, 0);
          this.redTriangle.display();
          this.scene.popMatrix();
      
      
          this.scene.pushMatrix();
          this.scene.translate(2, -1.4, 0);
          this.scene.scale(0.7, 0.7, 0);
          this.scene.setDiffuse(150/255, 80/255, 190/255, 0);
          this.purpleTriangle.display();
          this.scene.popMatrix();
          // ---- END Primitive drawing section
    }
	
}

