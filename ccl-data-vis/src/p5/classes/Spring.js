export class Spring {
  constructor(fromNode, toNode, length, stiffness, damping, p5) {
    this.fromNode = fromNode;
    this.toNode = toNode;

    this.length = length || 75;
    this.stiffness = stiffness || 0.6;
    this.damping = damping || 0.9;

    // access p5
    this.p5 = p5;

    console.log("Init spring", this);
  }

  update() {
    // calculate the target position
    // target = normalize(to - from) * length + from
    let to = this.p5.createVector(this.toNode.x, this.toNode.y);
    let from = this.p5.createVector(this.fromNode.x, this.fromNode.y);

    let diff = this.p5.Vector.sub(to, from);
    diff.normalize();
    diff.mult(this.length);
    let target = this.p5.Vector.add(from, diff);

    let force = this.p5.Vector.sub(target, to);
    force.mult(0.5);
    force.mult(this.stiffness);
    force.mult(1 - this.damping);

    this.toNode.velocity.add(force);
    this.fromNode.velocity.add(this.p5.Vector.mult(force, -1));
  }
}
