//nodeClassFile

//constructor
var Node = function(n, h, x, y, minX, maxX, minY, maxY) {
  p5.Vector.call(this, x, y, 0);
  this.name = n;
  this.links = [];
  this.hier = h;

  //boundingValues
  this.minX = Number.MIN_VALUE || minX;
  this.maxX = Number.MAX_VALUE || maxX;
  this.minY = Number.MIN_VALUE || minY;
  this.maxY = Number.MAX_VALUE || maxY;

  //physicsValues
  this.radius = nodeDiameters[h] + 200; // Radius of impact
  this.ramp = 1; // Influences the shape of the function
  this.strength = -1; // Strength: positive value attracts, negative value repels
  this.damping = 0.5;

  //posAttributes
  this.velocity = new p5.Vector(0, 0);
  this.pVelocity = new p5.Vector(0, 0);
  this.maxVelocity = 10;
}

//pushPhysics
Node.prototype.attractNodes = function(nodeArray) {
  for (var i = 0; i < nodeArray.length; i++) {
    var otherNode = nodeArray[i];
    // Stop when empty
    if (otherNode === undefined) break;
    // Continue from the top when node is itself
    if (otherNode === this) continue;

    this.attract(otherNode);
  }
};

Node.prototype.attract = function(otherNode) {
  var thisNodeVector = new p5.Vector(this.x, this.y);
  var otherNodeVector = new p5.Vector(otherNode.x, otherNode.y);
  var d = thisNodeVector.dist(otherNodeVector);

  if (d > 0 && d < this.radius) {
    var s = myp5.pow(d / this.radius, 1 / this.ramp);
    var f = s * 9 * this.strength * (1 / (s + 1) + ((s - 3) / 4)) / d;
    var df = thisNodeVector.sub(otherNodeVector);
    df.mult(f);

    otherNode.velocity.x += df.x;
    otherNode.velocity.y += df.y;
  }
};

//updatePhysics
Node.prototype.update = function() {
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
};

//updateLinks
Node.prototype.link = function(linkArray) {
  for (let i = 0; i < linkArray.length; i++) {
    this.links.push(linkArray[i]);
  }
}

Node.prototype.constructor = Node;
