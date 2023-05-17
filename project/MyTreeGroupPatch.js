import {CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
  constructor(scene) {
    super(scene);
    
    this.getCoordinates();

    this.trees = [];

    this.x = (Math.random() * 75) - 115;
		this.y = -2;
		this.z = (Math.random() * 75) - 120;
    
    for(var i = 0; i < 9; i++){
      var x = this.coords[i][0];
      var y = this.coords[i][1];  
      var z = this.coords[i][2];
      this.trees.push(new MyBillboard(scene, x, y, z));
    }
    
  }

  display(){
    for(var i = 0; i < 9; i++){
      this.scene.pushMatrix();
      // this.scene.translate(this.x, this.y, this.z);
      this.trees[i].display(this.x, this.y, this.z);
      this.scene.popMatrix();
    }
  }

  getCoordinates(){
    this.coords = [
      [-10 + this.getRandomOffset() , 0, -10 + this.getRandomOffset()],
      [0, 0, -10 + this.getRandomOffset()],
      [10 + this.getRandomOffset(), 0, -10 + this.getRandomOffset()],
      [-10 + this.getRandomOffset(), 0, 0],
      [0, 0, 0],
      [10 + this.getRandomOffset(), 0, 0],
      [-10 + this.getRandomOffset(), 0, 10 + this.getRandomOffset()],
      [0, 0, 10 + this.getRandomOffset()],
      [10 + this.getRandomOffset(), 0, 10 + this.getRandomOffset()],
    ];
  }

  getRandomOffset(){
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    return Math.random() * 4 * plusOrMinus;
  }
  
}