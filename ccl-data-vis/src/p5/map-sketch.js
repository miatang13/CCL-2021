//Sketch File

import { NodeObj, T1, T2, T3 } from "./classes/Node";
import { Spring } from "./classes/Spring";

//dataStorage;
let dataCategory = []; //blueCircles
let dataFocus = []; //brownCircles
let dataAttributes = []; //grayCircles

//nodeStorage
let nodes = [];
let springs = [];

//springProperties
let sLength = 150;
let sStiffness = 1;

export class p5MapObj {
  constructor(p5) {
    this.p5 = p5;
  }

  init(dataArr) {
    console.log("Init nodes and springs with", this.p5, dataArr);
    //centerReference
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let rFactor = 150;

    //fillNodeHierarchy
    let newNode = new NodeObj("2020 Census", cx, cy, this.p5);
    let d0 = [newNode];
    let d1 = [];
    let d2 = [];
    let d3 = [];

    let nD1 = 0;
    let nD2 = 0;
    let nD3 = 0;

    //parseData
    for (let row of dataArr) {
      let rx = this.p5.random(-100, 100);
      let ry = this.p5.random(-100, 100);

      if (row[0] === "*") {
        //Tier 1
        //node
        newNode = new T1(row, cx + rx, cy + ry, this.p5);
        d1.push(newNode);

        let newSpring = new Spring(
          d0[0],
          newNode,
          sLength,
          sStiffness,
          this.p5
        );
        springs.push(newSpring);
      } else if (row[0] === "-") {
        //Tier 2
        newNode = new T2(row, cx + rx, cy + ry, this.p5);
        d2.push(newNode);

        //spring
        let newSpring = new Spring(
          d1[d1.length - 1],
          newNode,
          sLength,
          sStiffness,
          this.p5
        );
        springs.push(newSpring);
      } else {
        //Tier 3
        let lArr = row.split(",");
        //node
        newNode = new T3(lArr[0], cx + rx, cy + ry, this.p5);
        d3.push(newNode);

        //spring

        let newSpring = new Spring(
          d2[d2.length - 1],
          newNode,
          sLength,
          sStiffness,
          this.p5
        );
        springs.push(newSpring);

        //links
        for (let i = 1; i < lArr.length; i += 2) {
          let a = [lArr[2], lArr[1]];
          newNode.link(a);
        }
      }
    }

    nodes = d0.concat(d1, d2);
    nodes = nodes.concat(d3);

    for (let n of nodes) {
      let rScale = 0;
      let totalN = 1;
      let curreN = 0;
      let dx = 0;
      let dy = 0;

      if (n instanceof T1) {
        rScale = rFactor;
        curreN = nD1;
        nD1 += 1;
        totalN = d1.length;
      } else if (n instanceof T2) {
        rScale = rFactor * 2;
        curreN = nD2;
        nD2 += 1;
        totalN = d2.length;
      } else if (n instanceof T3) {
        rScale = rFactor * 3;
        curreN = nD3;
        nD3 += 1;
        totalN = d3.length;
      }

      let angle = (curreN / totalN) * this.p5.TWO_PI;
      //print(angle);

      dx = rScale * this.p5.cos(angle);
      dy = rScale * this.p5.sin(angle);

      n.x = cx + dx;
      n.y = cy + dy;
    }
  }

  drawFunc() {
    this.p5.background(225);

    //repelNodes
    nodes[0].x = window.innerWidth / 2;
    nodes[0].y = window.innerHeight / 2;

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].attractNodes(nodes);
    }
    //applySprings
    for (let i = 0; i < springs.length; i++) {
      springs[i].update();
    }
    //updateNodePos
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
    }

    //drawSprings
    this.p5.stroke(0, 130, 164);
    this.p5.strokeWeight(2);
    for (let i = 0; i < springs.length; i++) {
      this.p5.line(
        springs[i].fromNode.x,
        springs[i].fromNode.y,
        springs[i].toNode.x,
        springs[i].toNode.y
      );
    }

    // draw nodes
    this.p5.noStroke();
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].drawNode();
    }
  }
}
