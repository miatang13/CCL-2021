class Spring {

  constructor(fromNode, toNode, length, stiffness, damping) {
    this.fromNode = fromNode;
    this.toNode = toNode;

    this.length = length || 75;
    this.stiffness = stiffness || 0.6;
    this.damping = damping || 0.9;
  }

  update() {
    // calculate the target position
    // target = normalize(to - from) * length + from

    let to = createVector(this.toNode.x, this.toNode.y);
    let from = createVector(this.fromNode.x, this.fromNode.y);

    let diff = p5.Vector.sub(to, from);
    diff.normalize();
    diff.mult(this.length);
    let target = p5.Vector.add(from, diff);

    let force = p5.Vector.sub(target, to);
    force.mult(0.5);
    force.mult(this.stiffness);
    force.mult(1 - this.damping);

    this.toNode.velocity.add(force);
    this.fromNode.velocity.add(p5.Vector.mult(force, -1));
  }
}
