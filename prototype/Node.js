//nodeClassFile

//constructor
class Node {

  constructor(n, h, x, y) {

    p5.Vector.call(this, x, y, 0);
    this.name = n;

    //boundingValues
    this.minX = Number.MIN_VALUE || minX;
    this.maxX = Number.MAX_VALUE || maxX;
    this.minY = Number.MIN_VALUE || minY;
    this.maxY = Number.MAX_VALUE || maxY;

    //physicsValues
    this.radius = 200; // Radius of impact
    this.ramp = 1; // Influences the shape of the function
    this.strength = -1; // Strength: positive value attracts, negative value repels
    this.damping = 0.5;

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

    let bounce = this.radius * 3;
    if (d > 0 && d < bounce) {
      var s = pow(d / bounce, 1 / this.ramp);
      var f = s * 9 * this.strength * (1 / (s + 1) + ((s - 3) / 4)) / d;
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
    ellipse(this.x, this.y, 50, 50);//this.radius, this.radius);
    fill(0);
    ellipse(this.x, this.y, 50, 50);//this.radius - 4, this.radius - 4);

    //textSize(10);
    fill(255);
    textAlign(CENTER);
    text(this.name, this.x, this.y);
  }
}

class T1 extends Node {

  constructor(n, h, x, y) {
    super(n, h, x, y);
    this.radius = 175;
  }
}

class T2 extends Node {
  constructor(n, h, x, y) {
    super(n, h, x, y);
    this.radius = 125;
  }
}

class T3 extends Node {
  constructor(n, h, x, y) {
    super(n, h, x, y);
    this.radius = 100;
    this.links = [];
  }

  link(linkArray) {
    for (let i = 0; i < linkArray.length; i++) {
      this.links.push(a);
    }
  }

  drawNode() {
    fill(255);
    ellipse(this.x, this.y, 50, 50);//this.radius, this.radius);
    fill(0);
    ellipse(this.x, this.y, 50, 50);//this.radius - 4, this.radius - 4);

    //textSize(10);
    textAlign(CENTER);
    fill(255);
    text(this.name, this.x, this.y + 20);

    //prep
    let numLinks = this.links.length;
    let textSize = spacing * numLinks;

    for (let j = 0; j < numLinks; j++) {
      let tX = this.x - textSize / 2 + (j * spacing);
      textSize(5);
      fill(255);
      this.links[j].position(tX, this.y - 20);
    }
  }
}
