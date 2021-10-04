//Sketch File
'use strict';

//dataStorage;
var txt;
let dataCategory = []; //blueCircles
let dataFocus = []; //brownCircles
let dataAttributes = []; //grayCircles

//nodeStorage
let nodes = [];
let springs = [];

//nodeProperties
let nodeDiameters = [50, 75, 100, 125];
let spacing = 10;
var rad = 0;

//springProperties
let sLength = 100;
let sStiffness = 1;

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(225);
  noStroke();

  initNodesAndSprings();
}

function draw() {

  background(225);

  //repelNodes
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].attractNodes(nodes);
  }
  //applySprings
  for (var i = 0; i < springs.length; i++) {
    springs[i].update();
  }
  //updateNodePos
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].update();
  }

  //drawSprings
  stroke(0, 130, 164);
  strokeWeight(2);
  for (var i = 0; i < springs.length; i++) {
    console.log(springs[i].fromNode.pos);
    line(springs[i].fromNode.x, springs[i].fromNode.y, springs[i].toNode.x, springs[i].toNode.y);
  }

  // draw nodes
  noStroke();
  for (var i = 0; i < nodes.length; i++) {

    //nodeBody
    fill(255);
    ellipse(nodes[i].x, nodes[i].y, nodeDiameters[nodes[i].hier], nodeDiameters[nodes[i].hier]);
    fill(0);
    ellipse(nodes[i].x, nodes[i].y, nodeDiameters[nodes[i].hier] - 4, nodeDiameters[nodes[i].hier] - 4);

    //drawText
    textSize(32);
    textAlign(CENTER);
    if (nodes[i].heir < 2) { //title, dataCategories, dataFocus, dataAttributes
      text(nodes[i].name, nodes[i].x, nodes[i].y);
    } else { //dataAttributes
      text(nodes[i].name, nodes[i].x, nodes[i].y + 20);

      //prep
      let numLinks = nodes[i].links.length;
      let textSize = spacing * numLinks;

      for (let j = 0; j < numLinks; j++) {
        let tX = nodes[i].x - textSize / 2 + (j * spacing);
        console.log(nodes[i].links[j]);
        let a = createA('nodes[i].links[j][0]',' nodes[i].links[j][1]');
        a.position(tX, nodes[i].y - 20);
      }
    }
  }
}

function initNodesAndSprings() {

  //centerReference
  let cx = windowWidth/2;
  let cy = windowHeight/2;

  //fillNodeHierarchy
  var newNode = new Node("2020 Census", 0, cx, cy);
  let d0 = [newNode];
  let d1 = [];
  let d2 = [];
  let d3 = [];

  //parseData
  for (let row of txt) {
    if (row[0] === "*") {
      //node
      newNode = new Node(row, 1, cx, cy);
      d1.push(newNode);

      //spring
      var newSpring = new Spring(d0[d0.length - 1], newNode, sLength, sStiffness);
      springs.push(newSpring);
    } else if (row[0] === "-") {
      newNode = new Node(row, 2, cx, cy);
      d2.push(newNode);

      //spring
      var newSpring = new Spring(d1[d1.length - 1], newNode, sLength, sStiffness);
      springs.push(newSpring);
    } else {
      let lArr = row.split(",");
      //node
      newNode = new Node(lArr[0], 3, cx, cy);
      d3.push(newNode);

      //spring
      var newSpring = new Spring(d2[d2.length - 1], newNode, sLength, sStiffness);
      springs.push(newSpring);

      //links
      for (let i = 1; i < lArr.length; i += 2) {
        newNode.link([lArr[i], lArr[i+1]]);
      }
    }
  }

  nodes = d0.concat(d1, d2, d3);
}

function preload() {
  txt = loadStrings('data.txt');
}
