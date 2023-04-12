import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.panorama = new MyPanorama(this, "images/panorama4.jpg");
    //this.sphere = new MySphere(this,1,20,20,true);
    // adicionar um invert atribute dentro do sphere se for true é dentro se for false é fora
    this.bird = new MyBird(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.textureEarth = new CGFtexture(this, "images/earth.jpg");
    this.appearanceEarth = new CGFappearance(this);  
    this.appearanceEarth.setTexture(this.textureEarth);
    this.appearanceEarth.setTextureWrap('REPEAT', 'REPEAT');

    this.textureEarthIn = new CGFtexture(this, "images/panorama4.jpg");
    this.appearanceEarthIn = new CGFappearance(this);
    this.appearanceEarthIn.setTexture(this.textureEarthIn);
    this.appearanceEarthIn.setAmbient(0.1, 0.1, 0.1, 1);
    this.appearanceEarthIn.setDiffuse(0.9, 0.9, 0.9, 1);
    this.appearanceEarthIn.setSpecular(0.1, 0.1, 0.1, 1);
    this.appearanceEarthIn.setShininess(10.0);
    this.appearanceEarthIn.setTextureWrap('REPEAT', 'REPEAT');

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      2.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();
    
    
    // ---- BEGIN Primitive drawing section
    // this.pushMatrix();
    // this.appearanceEarth.apply();
    // this.rotate(-Math.PI/2.0,1,0,0);
    // this.rotate(Math.PI/2,0,0,1);
    // this.sphere.display();
    // this.popMatrix();
    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.bird.display();

    // ---- END Primitive drawing section
  }
}