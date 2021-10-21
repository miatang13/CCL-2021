//nodeClassFile

//constructor
class Node {

  constructor(n, x, y) {

    p5.Vector.call(this, x, y, 0);
    this.name = n;

    //boundingValues
    this.minX = Number.MIN_VALUE || minX;
    this.maxX = Number.MAX_VALUE || maxX;
    this.minY = Number.MIN_VALUE || minY;
    this.maxY = Number.MAX_VALUE || maxY;

    //physicsValues
    this.radius = 200; // Radius of impact
    this.ramp = 2; // Influences the shape of the function
    this.strength = -1; // Strength: positive value attracts, negative value repels
    this.damping = 0.1;

    //posAttributes
    this.velocity = createVector();
    this.pVelocity = createVector();
    this.maxVelocity = 10;
  }

  attractNodes(nodeArray) {

    for (var i = 0; i < nodeArray.length; i++) {
      var otherNode = nodeArray[i];
      // Stop when empty
      if (otherNode === undefined) break;
      // Continue from the top when node is itself
      if (otherNode === this) continue;

      this.attract(otherNode);
    }
  }

  attract(otherNode) {

    let thisNodeVector = new p5.Vector(this.x, this.y);
    let otherNodeVector = new p5.Vector(otherNode.x, otherNode.y);
    let d = thisNodeVector.dist(otherNodeVector);

    let bounce = this.radius * 2;
    if (d > 0 && d < bounce) {
      var s = pow(d / bounce, 1 / this.ramp);
      var f = s * 10 * this.strength * (1 / (s + 1) + ((s - 3) / 4)) / d;
      var df = thisNodeVector.sub(otherNodeVector);
      df.mult(f);

      otherNode.velocity.x += df.x;
      otherNode.velocity.y += df.y;
    }
  }

  update() {
    this.velocity.limit(this.maxVelocity);

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x < this.minX) {
      this.x = this.minX - (this.x - this.minX);
      this.velocity.x = -this.velocity.x;
    }
    if (this.x > this.maxX) {
      this.x = this.maxX - (this.x - this.maxX);
      this.velocity.x = -this.velocity.x;
    }

    if (this.y < this.minY) {
      this.y = this.minY - (this.y - this.minY);
      this.velocity.y = -this.velocity.y;
    }
    if (this.y > this.maxY) {
      this.y = this.maxY - (this.y - this.maxY);
      this.velocity.y = -this.velocity.y;
    }

    this.velocity.mult(1 - this.damping);
  }

  drawNode() {
    fill(255);
    ellipse(this.x, this.y, this.radius, this.radius);
    fill(0);
    ellipse(this.x, this.y, this.radius - 4, this.radius - 4);

    //textSize(10);
    fill(255);
    textAlign(CENTER);
    text(this.name, this.x, this.y);
  }
}

class T1 extends Node {

  constructor(n, h, x, y) {
    super(n, h, x, y);
    this.radius = 100;
  }
}

class T2 extends Node {
  constructor(n, h, x, y) {
    super(n, h, x, y);
    this.radius = 75;
  }
}

class T3 extends Node {
  constructor(n, h, x, y) {
    super(n, h, x, y);
    this.radius = 50;
    this.links = [];
    this.curLinks = [];
  }

  link(linkArray) {
    for (let i = 0; i < linkArray.length; i++) {
      this.links.push(linkArray[i]);
    }
    for (let i = 0; i < this.links.length; i+=2) {
      this.curLinks.push(createA(this.links[i], this.links[i+1], '_blank'));
    }
  }

  drawNode() {

    fill(255);
    ellipse(this.x, this.y, this.radius, this.radius);
    fill(0);
    ellipse(this.x, this.y, this.radius - 4, this.radius - 4);

    //textSize(10);
    textAlign(CENTER);
    fill(255);
    text(this.name, this.x, this.y + 20);

    //prep
    let numLinks = this.links.length;
    let textSize = spacing * numLinks;

    for (let j = 0; j < numLinks; j++) {
      let tX = this.x - textSize / 2 + (j * spacing);
      //p5.textSize(5);
      fill(255);
      for (let link of this.curLinks) {
        link.position(this.x, this.y);
      }
    }
  }
}
