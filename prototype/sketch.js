//Sketch File

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

function preload() {
  txt = loadStrings('data.txt');
}

function setup() {

  //Graphics Setup
  createCanvas(windowWidth, windowHeight);

  //Data Setup
  initNodesAndSprings();
}

function draw() {

  background(225);

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
  stroke(0, 130, 164);
  strokeWeight(2);
  for (let i = 0; i < springs.length; i++) {
    line(springs[i].fromNode.x, springs[i].fromNode.y, springs[i].toNode.x, springs[i].toNode.y);
  }

  // draw nodes
  noStroke();
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].drawNode();
  }
}

function initNodesAndSprings() {

  //centerReference
  let cx = windowWidth / 2;
  let cy = windowHeight / 2;

  //fillNodeHierarchy
  let newNode = new Node("2020 Census", 0, cx, cy);
  let d0 = [newNode];
  let d1 = [];
  let d2 = [];
  let d3 = [];

  //parseData
  for (let row of txt) {
    let rx = random(-100, 100);
    let ry = random(-100, 100);

    if (row[0] === "*") { //Tier 1
      //node
      newNode = new T1(row, 1, cx + rx, cy + ry);
      d1.push(newNode);

      //spring
      let newSpring = new Spring(d0[0], newNode, sLength, sStiffness);
      springs.push(newSpring);

    } else if (row[0] === "-") { //Tier 2
      newNode = new T2(row, 2, cx + rx, cy + ry);
      d2.push(newNode);

      //spring
      let newSpring = new Spring(d1[d1.length - 1], newNode, sLength, sStiffness);
      springs.push(newSpring);

    } else { //Tier 3
      let lArr = row.split(",");
      //node
      newNode = new T3(lArr[0], 3, cx + rx, cy + ry);
      d3.push(newNode);

      //spring
      let newSpring = new Spring(d2[d2.length - 1], newNode, sLength, sStiffness);
      springs.push(newSpring);

      //links
      for (let i = 1; i < lArr.length; i += 2) {
        let a = createA(lArr[1], lArr[0]);
        newNode.link(a);
      }
    }
  }
  nodes = d0.concat(d1, d2);
  nodes = nodes.concat(d3);
}
