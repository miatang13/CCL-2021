const {
  Engine,
  Render,
  World,
  Bodies,
  Body,
  Mouse,
  MouseConstraint,
  Events,
  Vector
} = Matter;

const FRICTIONAIR = 0.3;
const dragging = {
  body:null,
  TORQUE_SCALE:0.0008
};
const engine = Engine.create();
const render = Render.create({
  element:document.body,
  engine
});



//
// setup world;
// bird view, no gravity
//
engine.world.gravity.y = 0.0;



//
// process dom elements
// 0. random rotation for elm
// 1. create matter body for each elm, add to bodyMap
// 2. listen elm events
//
const elms = document.querySelectorAll("img");
const bodyMap = new WeakMap();

for (const elm of elms) {
  
  const {width, left, top, height} = elm.getBoundingClientRect();
  const cx = left + width * 0.5;
  const cy = top + height * 0.5;
  const body = Bodies.rectangle(cx, cy, width, height);
  body.frictionAir = FRICTIONAIR;
  body.collisionFilter.group = -1; // same -ve means never collide 
  
  const angle = Math.random() * Math.PI/4 - Math.PI/8;
  elm.style.transformOrigin = `50% 50%`;
  Matter.Body.rotate(body, angle, Vector.create(cx, cy));

  World.add(engine.world, [body]);
  bodyMap.set(elm, body);
  elm.ondragstart = () => false;
  elm.onmousedown = e => {
    for (const elm of elms)
      elm.classList.toggle("drag", elm == e.target);
  };
  elm.onmouseover = e => {
    elbga.href = 
      elbga.textContent = e.target.dataset.url;
  }
}



//
// sync dom elm with engine body
//
Matter.Events.on(engine, "tick", e => {
  for (const elm of elms) {
    const body = bodyMap.get(elm);
    // check oob here ...
    elm.style.top = `${body.position.y}px`;
    elm.style.left = `${body.position.x}px`;
    elm.style.transform = `translate(-50%, -50%)rotate(${body.angle}rad)`;
  }
});

//
// Run engine, render(for debug)
//
Engine.run(engine);
Render.run(render);



//
// setup mouseconstraint
//
const mouse = Mouse.create(document.body);
const mouseconstraint = MouseConstraint.create(engine,{
  mouse
});

Events.on(mouseconstraint, "startdrag", e => {
  dragging.body = e.body;
});

Events.on(mouseconstraint, "enddrag", e => {
  dragging.body = null;
});

Events.on(mouseconstraint, "mousemove", e => {
  if (dragging.body) {
    Matter.Body.applyForce(
      dragging.body,
      e.mouse.mousedownPosition,
      Vector.mult(dragging.body.velocity, dragging.TORQUE_SCALE * dragging.body.mass)
    );
  }
})
World.add(engine.world, [mouseconstraint]);


