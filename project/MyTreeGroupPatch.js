import {CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
  constructor(scene) {
    super(scene);
    
    this.getCoordinates();

    this.trees = [];

    while(this.notCloseToNest());

    
    for(var i = 0; i < 9; i++){
      this.trees.push(new MyBillboard(scene));
    }
    
  }

  display(){
    for(var i = 0; i < 9; i++){
      this.trees[i].display(this.x + this.coords[i][0], this.y + this.coords[i][1], this.z + this.coords[i][2]);
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

  notCloseToNest(){
    this.x = (Math.random() * 75) - 115;
		this.y = 0;
		this.z = (Math.random() * 75) - 120;

    var nestX = this.scene.nest.x;
    var nestZ = this.scene.nest.z;

    var xDis = this.x - nestX;
    var zDis = this.z - nestZ;
    
    var totalDis = Math.pow(Math.pow(xDis,2) + Math.pow(zDis, 2) ,0.5);
    return totalDis < 25;
  }
  
}