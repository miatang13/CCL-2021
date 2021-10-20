import React from "react";
import Sketch from "react-p5";
import { MAP_DATA } from "../data/map.js";
import { getCategories } from "../data/utility";

function P5map() {
  const setup = (p5, canvasParentRef) => {
    console.log("Set up p5 with", canvasParentRef);
    p5.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.9).parent(
      canvasParentRef
    );
    console.log("Get some data", getCategories(MAP_DATA));
  };

  const draw = (p5) => {
    p5.background(200, 200, 200);
    p5.ellipse(100, 100, 100);
  };

  return <Sketch setup={setup} draw={draw} />;
}

export default P5map;
