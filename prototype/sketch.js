//Sketch File
'use strict';

var sketch = function(p) {

  //dataStorage;
  let txt;
  let dataCategory = []; //blueCircles
  let dataFocus = []; //brownCircles
  let dataAttributes = []; //grayCircles

  //nodeStorage
  let nodes = [];
  let springs = [];

  //nodeProperties
  let nodeDiameters = [50, 75, 100, 125];
  let spacing = 10;
  let rad = 0;

  //springProperties
  let sLength = 100;
  let sStiffness = 1;

  p.preload = function() {
    txt = p.loadStrings('data.txt');
  }

  p.setup = function() {

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(225);
    p.noStroke();

    p.initNodesAndSprings();
  }

  p.draw = function() {

    p.background(225);

    //repelNodes
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
    p.stroke(0, 130, 164);
    p.strokeWeight(2);
    for (let i = 0; i < springs.length; i++) {
      p.line(springs[i].fromNode.x, springs[i].fromNode.y, springs[i].toNode.x, springs[i].toNode.y);
    }

    // draw nodes
    p.noStroke();
    for (let i = 0; i < nodes.length; i++) {

      //nodeBody
      p.fill(255);
      p.ellipse(nodes[i].x, nodes[i].y, 50, 50);
      p.fill(0);
      p.ellipse(nodes[i].x, nodes[i].y, 50 - 4, 50 - 4);

      //drawText
      p.textSize(10);
      p.fill(255);
      p.textAlign(p.CENTER);
      if (nodes[i].heir < 2) { //title, dataCategories, dataFocus, dataAttributes
        p.text(nodes[i].name, nodes[i].x, nodes[i].y);
      } else { //dataAttributes
        p.text(nodes[i].name, nodes[i].x, nodes[i].y + 20);

        //prep
        let numLinks = nodes[i].links.length;
        let textSize = spacing * numLinks;

        for (let j = 0; j < numLinks; j++) {
          let tX = nodes[i].x - textSize / 2 + (j * spacing);
          console.log(nodes[i].links[j]);
          p.textSize(5);
          p.fill(255);
          nodes[i].links[j].position(tX, nodes[i].y - 20);
        }
      }
    }
  }

  p.initNodesAndSprings = function() {

    //centerReference
    let cx = p.windowWidth / 2;
    let cy = p.windowHeight / 2;

    //fillNodeHierarchy
    let newNode = new Node("2020 Census", 0, cx, cy, nodeDiameters[0]);
    let d0 = [newNode];
    let d1 = [];
    let d2 = [];
    let d3 = [];

    //parseData
    for (let row of txt) {
      let rx = p.random(-100, 100);
      let ry = p.random(-100, 100);

      if (row[0] === "*") { //Tier 1
        //node
        newNode = new Node(row, 1, cx + rx, cy + ry, nodeDiameters[1]);
        d1.push(newNode);

        //spring
        let newSpring = new Spring(d0[d0.length - 1], newNode, sLength, sStiffness);
        springs.push(newSpring);

      } else if (row[0] === "-") { //Tier 2
        newNode = new Node(row, 2, cx + rx, cy + ry, nodeDiameters[2]);
        d2.push(newNode);

        //spring
        let newSpring = new Spring(d1[d1.length - 1], newNode, sLength, sStiffness);
        springs.push(newSpring);

      } else { //Tier 3
        let lArr = row.split(",");
        //node
        newNode = new Node(lArr[0], 3, cx + rx, cy + ry, nodeDiameters[3]);
        d3.push(newNode);

        //spring
        let newSpring = new Spring(d2[d2.length - 1], newNode, sLength, sStiffness);
        springs.push(newSpring);

        //links
        for (let i = 1; i < lArr.length; i += 2) {
          let a = p.createA(lArr[1], lArr[0]);
          newNode.link(a);
        }
      }
    }

    nodes = d0.concat(d1, d2, d3);
  }
}

var myp5 = new p5(sketch);
