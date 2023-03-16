import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {

    constructor(scene, texTop, texFront, texRight, texBack, texLeft, texBottom) {
        super(scene);

        this.faceA = new MyQuad(this.scene); // FRONT
        this.faceB = new MyQuad(this.scene); // BACK
        this.faceC = new MyQuad(this.scene); // BOTTOM
        this.faceD = new MyQuad(this.scene); // TOP
        this.faceE = new MyQuad(this.scene); // RIGHT
        this.faceF = new MyQuad(this.scene); // LEFT

        this.texture1 = new CGFtexture(this.scene, 'images/'+texTop);
        this.texture2 = new CGFtexture(this.scene, 'images/'+texFront);
        this.texture3 = new CGFtexture(this.scene, 'images/'+texRight);
        this.texture4 = new CGFtexture(this.scene, 'images/'+texBack);
        this.texture5 = new CGFtexture(this.scene, 'images/'+texLeft);
        this.texture6 = new CGFtexture(this.scene, 'images/'+texBottom);

        this.cubeMaterial = new CGFappearance(this.scene);
        this.cubeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeMaterial.setSpecular(0.1, 0.1, 0.1, 1);        
        this.cubeMaterial.setShininess(10.0);
        this.cubeMaterial.loadTexture('images/tangram.png');
        this.cubeMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {

        // TOP
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-90.0*Math.PI/180.0, 1, 0, 0);
        this.cubeMaterial.setTexture(this.texture1);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.faceD.display();
        this.scene.popMatrix();
        
        // FRONT
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.cubeMaterial.setTexture(this.texture2);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.faceA.display();
        this.scene.popMatrix();

        // RIGHT
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(90.0*Math.PI/180.0, 0, 1, 0);
        this.cubeMaterial.setTexture(this.texture3);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.faceE.display();
        this.scene.popMatrix();

        // BACK
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.cubeMaterial.setTexture(this.texture4);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.faceB.display();
        this.scene.popMatrix();

        // LEFT
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-90.0*Math.PI/180.0, 0, 1, 0);
        this.cubeMaterial.setTexture(this.texture5);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.faceF.display();
        this.scene.popMatrix();

        // BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(90.0*Math.PI/180.0, 1, 0, 0);
        this.cubeMaterial.setTexture(this.texture6);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.faceC.display();
        this.scene.popMatrix();
    }

    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}