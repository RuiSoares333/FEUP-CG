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
                this.initMaterials();

                //Initialize scene objects
                this.diamond = new MyDiamond(scene);
                this.triangle = new MyTriangle(scene);
                this.triangleBig = new MyTriangleBig(scene);
                this.triangleSmall = new MyTriangleSmall(scene);
                this.parallelogram = new MyParallelogram(scene);
        }

        initBuffers() {
                this.initGLBuffers();
        }

        updateBuffers() {

        }

        initMaterials() {
                // Red
                this.red = new CGFappearance(this.scene);
                this.red.setAmbient(0.1, 0.1, 0.1, 1);
                this.red.setDiffuse(1, 0, 0, 1);
                this.red.setSpecular(1, 1, 1, 0);
                this.red.setShininess(10.0);

                // Yellow
                this.yellow = new CGFappearance(this.scene);
                this.yellow.setAmbient(0.1, 0.1, 0.1, 1);
                this.yellow.setDiffuse(1, 1, 0, 1);
                this.yellow.setSpecular(1, 1, 1, 0);
                this.yellow.setShininess(10.0);

                // Green
                this.green = new CGFappearance(this.scene);
                this.green.setAmbient(0.1, 0.1, 0.1, 1);
                this.green.setDiffuse(0, 1, 0, 1);
                this.green.setSpecular(1, 1, 1, 0);
                this.green.setShininess(10.0);

                // Blue
                this.blue = new CGFappearance(this.scene);
                this.blue.setAmbient(0.1, 0.1, 0.1, 1);
                this.blue.setDiffuse(0, 0.4, 0.85, 1);
                this.blue.setSpecular(1, 1, 1, 0);
                this.blue.setShininess(10.0);

                // Pink
                this.pink = new CGFappearance(this.scene);
                this.pink.setAmbient(0.1, 0.1, 0.1, 1);
                this.pink.setDiffuse(1, 0.4, 0.6, 1);
                this.pink.setSpecular(1, 1, 1, 0);
                this.pink.setShininess(10.0);

                // Orange
                this.orange = new CGFappearance(this.scene);
                this.orange.setAmbient(0.1, 0.1, 0.1, 1);
                this.orange.setDiffuse(1, 0.5, 0, 1);
                this.orange.setSpecular(1, 1, 1, 0);
                this.orange.setShininess(10.0);

                // Purple
                this.purple = new CGFappearance(this.scene);
                this.purple.setAmbient(0.1, 0.1, 0.1, 1);
                this.purple.setDiffuse(0.58, 0, 0.827, 1);
                this.purple.setSpecular(1, 1, 1, 0);
                this.purple.setShininess(10.0);

                this.diamondMaterial = new CGFappearance(this.scene);
                this.diamondMaterial.setShininess(10.0);
                this.diamondMaterial.loadTexture('images/tangram.png');
                this.diamondMaterial.setTextureWrap('REPEAT', 'REPEAT');
        }

        display(){
        
                var tra1 = [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    2.5, 7.1, 0, 1
                  ]
                  
                  // ---- BEGIN Primitive drawing section
                this.scene.pushMatrix();
                this.scene.multMatrix(tra1);
                // this.green.apply();

                this.diamond.display();
                this.scene.popMatrix();
                  
              
                this.scene.pushMatrix();
                this.scene.translate(3.5, 5, 0);
                this.scene.rotate(135*Math.PI/180, 0, 0, 1);
                this.blue.apply();
                this.triangleBig.display();
                this.scene.popMatrix();
              
              
                this.scene.pushMatrix();
                this.scene.translate(2.05, 4.2, 0);
                this.scene.rotate(90*Math.PI/180, 0, 0, 1);
                this.orange.apply()
                this.triangleBig.display();
                this.scene.popMatrix();
              
                this.scene.pushMatrix();
                this.scene.translate(3.5, 0.75, 0);
                this.scene.rotate(180*Math.PI/180, 0, 1, 0);
                this.scene.rotate(180*Math.PI/180, 1, 0, 0);
                this.scene.rotate(-45*Math.PI/180, 0, 0, 1);
                this.yellow.apply();
                this.parallelogram.display();
                this.scene.popMatrix();
              
              
                this.scene.pushMatrix();
                this.scene.translate(1, 2.2, 0);
                this.pink.apply();
                this.triangleSmall.display();
                this.scene.popMatrix();
              
        
                this.scene.pushMatrix();
                this.scene.translate(-0.15, 2.1, 0);
                this.scene.rotate(45*Math.PI/180, 0, 0, 1);
                this.red.apply();
                this.triangleSmall.display();
                this.scene.popMatrix();
              
              
                this.scene.pushMatrix();
                this.scene.translate(3.5, 0.7, 0);
                this.scene.rotate(135*Math.PI/180, 0, 0, 1);
                this.purple.apply();
                this.triangleSmall.display();
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