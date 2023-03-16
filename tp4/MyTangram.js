import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
        constructor(scene) {
            super(scene);

        
            this.texCoordsPurpleTriangle = [
                0.0, 0.0,
                0.0, 0.5,
                0.25, 0.25
            ];

            this.texCoordsRedTriangle = [
                0.25, 0.75,
                0.75, 0.75,
                0.5, 0.5
            ];

            this.texCoordsPinkTriangle = [
                0.5, 1.0,
                0.0, 0.5,
                0.0, 1.0
            ];

            this.texCoordsBlueTriangle = [
                1.0, 0.0,
                0.0, 0.0,
                0.5, 0.5,
            ];

            this.texCoordsOrangeTriangle = [
                1.0, 1.0,
                1.0, 0.0,
                0.5, 0.5
            ];

            //Initialize scene objects
            this.diamond = new MyDiamond(this.scene);
            this.purpleTriangle = new MyTriangleSmall(this.scene, this.texCoordsPurpleTriangle);
            this.redTriangle = new MyTriangleSmall(this.scene, this.texCoordsRedTriangle);
            this.parallelogram = new MyParallelogram(this.scene);
            this.pinkTriangle = new MyTriangleSmall(this.scene, this.texCoordsPinkTriangle);
            this.blueTriangleBig = new MyTriangleBig(this.scene, this.texCoordsBlueTriangle);
            this.orangeTriangleBig = new MyTriangleBig(this.scene, this.texCoordsOrangeTriangle);
        }

        display(){
            this.scene.tangramMaterial.apply();

        
                var tra1 = [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    2.5, 7.1, 0, 1
                ]
                

                // ---- BEGIN Primitive drawing section
                // GREEN
                this.scene.pushMatrix();
                this.scene.multMatrix(tra1);
                this.diamond.display();
                this.scene.popMatrix();
                  
                // BLUE
                this.scene.pushMatrix();
                this.scene.translate(3.5, 5, 0);
                this.scene.rotate(135*Math.PI/180, 0, 0, 1);
                this.blueTriangleBig.display();
                this.scene.popMatrix();
              
                // ORANGE
                this.scene.pushMatrix();
                this.scene.translate(2.05, 4.2, 0);
                this.scene.rotate(90*Math.PI/180, 0, 0, 1);
                this.orangeTriangleBig.display();
                this.scene.popMatrix();
              
                // YELLOW
                this.scene.pushMatrix();
                this.scene.translate(3.5, 0.75, 0);
                this.scene.rotate(180*Math.PI/180, 0, 1, 0);
                this.scene.rotate(180*Math.PI/180, 1, 0, 0);
                this.scene.rotate(-45*Math.PI/180, 0, 0, 1);
                this.parallelogram.display();
                this.scene.popMatrix();
              
                // PINK
                this.scene.pushMatrix();
                this.scene.translate(1, 2.2, 0);
                this.pinkTriangle.display();
                this.scene.popMatrix();
              
                // RED
                this.scene.pushMatrix();
                this.scene.translate(-0.15, 2.1, 0);
                this.scene.rotate(45*Math.PI/180, 0, 0, 1);
                this.redTriangle.display();
                this.scene.popMatrix();
              
                // PURPLE
                this.scene.pushMatrix();
                this.scene.translate(3.5, 0.7, 0);
                this.scene.rotate(135*Math.PI/180, 0, 0, 1);
                this.purpleTriangle.display();
                this.scene.popMatrix();
                // ---- END Primitive drawing section
        }

        enableNormalViz() {
                this.triangle.enableNormalViz();
                this.diamond.enableNormalViz();
                this.triangleBig.enableNormalViz();
                this.triangleSmall.enableNormalViz();
                this.parallelogram.enableNormalViz();
        }

        disableNormalViz() {
                this.triangle.disableNormalViz();
                this.diamond.disableNormalViz();
                this.triangleBig.disableNormalViz();
                this.triangleSmall.disableNormalViz();
                this.parallelogram.disableNormalViz();
        }

}