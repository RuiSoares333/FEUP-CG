import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";

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


        //Objects connected to MyInterface
        this.displayAxis = true;
        this.cameraLock = true;
        this.scaleFactor = 1;
        this.speedFactor = 1;


        //Initialize scene objects
        this.axis = new CGFaxis(this);
        
        this.terrain = new MyTerrain(this);
        
        this.panorama = new MyPanorama(this, "images/panorama4.jpg");
        
        this.bird = new MyBird(this);
       
        this.nest = new MyNest(this);

        this.nTrees = 10;
        this.trees = [];
        
        for (var i = 0; i < this.nTrees; i++) {
            var treeGroup = i % 2 ? new MyTreeGroupPatch(this) : new MyTreeRowPatch(this);
            this.trees.push(treeGroup);
        }

        this.enableTextures(true);

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
                

        // set the scene update period 
        // (to invoke the update() method every 60ms or as close as possible to that )
        this.setUpdatePeriod(1);
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
            vec3.fromValues(-10, 10, 0),
            vec3.fromValues(0, 0, 0)
        );
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            keysPressed = true;
        }
        
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
        }
        
        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyP")) {
            text += " P ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyO")) {
            text += " O ";
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("Space")){
            text += " U ";
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("ShiftLeft")){
            text += " X ";
            keysPressed = true;
        }
        
        if (keysPressed)
            console.log(text);

        return text;
    }

    update (){
        this.bird.movementHandler(this.checkKeys());
        this.bird.update();
    }
    
    display() {
        // Init time
        var now = Date.now();
        this.deltaTime = now - (this.lastUpdateTime || now);
        this.lastUpdateTime = now;

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
        
        
        this.setCameraPosition();

        
        // ---- BEGIN Primitive drawing section
        // Panorama
        this.panorama.display();

        // Bird
        this.bird.display();

        // Terrain
        this.pushMatrix();
            this.translate(0, -24, 0);
            this.terrain.display();
        this.popMatrix();
        this.setActiveShader(this.defaultShader);
        
        // Nest
        this.nest.display();
        
        // Trees
        for (var i = 0; i < this.trees.length; i++) {
            this.trees[i].display();
        }
        
        // ---- END Primitive drawing section
    }

    setCameraPosition(){
        // Set camera position and target to follow the bird
        const birdPosition = this.bird.getPosition();
        const birdForward = this.bird.getOrientation();
        const cameraDistance = -10;
        const cameraHeight = 10;
        const cameraPosition = vec3.fromValues(
            birdPosition[0] - birdForward[0] * cameraDistance,
            birdPosition[1] + cameraHeight,
            birdPosition[2] - birdForward[2] * cameraDistance
        );
        const cameraTarget = vec3.fromValues(
            birdPosition[0],
            birdPosition[1],
            birdPosition[2]
        );
        if(this.cameraLock){
            this.camera.setPosition(cameraPosition);
            this.camera.setTarget(cameraTarget);
        }
    }
}
