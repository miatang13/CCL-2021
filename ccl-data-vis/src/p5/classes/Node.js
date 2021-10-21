//nodeClassFile
//nodeProperties
let spacing = 10;

//constructor
export class NodeObj {
  constructor(n, x, y, p5) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.name = n;

    //boundingValues
    this.minX = Number.MIN_VALUE || this.p5.minX;
    this.maxX = Number.MAX_VALUE || this.p5.maxX;
    this.minY = Number.MIN_VALUE || this.p5.minY;
    this.maxY = Number.MAX_VALUE || this.p5.maxY;

    //physicsValues
    this.radius = 200; // Radius of impact
    this.ramp = 2; // Influences the shape of the function
    this.strength = -1; // Strength: positive value attracts, negative value repels
    this.damping = 0.1;

    //posAttributes
    this.velocity = p5.createVector();
    this.pVelocity = p5.createVector();
    this.maxVelocity = 10;

    // access p5
    this.p5 = p5;

    // reusable var for attract
    this.thisNodeVector = p5.createVector();
    this.otherNodeVector = p5.createVector();
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
    this.thisNodeVector.x = this.x;
    this.thisNodeVector.y = this.y;
    this.otherNodeVector.x = otherNode.x;
    this.otherNodeVector.y = otherNode.y;
    let d = this.thisNodeVector.dist(this.otherNodeVector);

    let bounce = this.radius * 2;
    if (d > 0 && d < bounce) {
      var s = this.p5.pow(d / bounce, 1 / this.ramp);
      var f = (s * 10 * this.strength * (1 / (s + 1) + (s - 3) / 4)) / d;
      var df = this.thisNodeVector.sub(this.otherNodeVector);
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
    this.p5.fill(255);
    this.p5.ellipse(this.x, this.y, this.radius, this.radius);
    this.p5.fill(0);
    this.p5.ellipse(this.x, this.y, this.radius - 4, this.radius - 4);

    //textSize(10);
    this.p5.fill(255);
    this.p5.textAlign(this.p5.CENTER);
    this.p5.text(this.name, this.x, this.y);
  }
}

export class T1 extends NodeObj {
  constructor(n, h, x, y, p5) {
    super(n, h, x, y, p5);
    this.radius = 100;
    this.p5 = p5;
  }
}

export class T2 extends NodeObj {
  constructor(n, h, x, y, p5) {
    super(n, h, x, y, p5);
    this.radius = 75;
    this.p5 = p5;
  }
}

export class T3 extends NodeObj {
  constructor(n, h, x, y, p5) {
    super(n, h, x, y, p5);
    this.radius = 50;
    this.links = [];
    this.curLinks = [];
    this.p5 = p5;
  }

  link(linkArray) {
    for (let i = 0; i < linkArray.length; i++) {
      this.links.push(linkArray[i]);
    }
    for (let i = 0; i < this.links.length; i += 2) {
      this.curLinks.push(
        this.p5.createA(this.links[i], this.links[i + 1], "_blank")
      );
    }
  }

  drawNode() {
    this.p5.fill(255);
    this.p5.ellipse(this.x, this.y, this.radius, this.radius);
    this.p5.fill(0);
    this.p5.ellipse(this.x, this.y, this.radius - 4, this.radius - 4);

    //textSize(10);
    this.p5.textAlign(this.p5.CENTER);
    this.p5.fill(255);
    this.p5.text(this.name, this.x, this.y + 20);

    //prep
    let numLinks = this.links.length;
    let textSize = spacing * numLinks;

    for (let j = 0; j < numLinks; j++) {
      let tX = this.x - textSize / 2 + j * spacing;
      //p5.textSize(5);
      this.p5.fill(255);
      for (let link of this.curLinks) {
        link.position(this.x, this.y);
      }
    }
  }
}
