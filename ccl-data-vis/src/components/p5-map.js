import React from "react";
import Sketch from "react-p5";
import { JSON_DATA_URL } from "../p5/constants";

function P5map() {
  console.log("hi");
  const setup = (p5, canvasParentRef) => {
    console.log(canvasParentRef);
    p5.createCanvas(500, 400).parent(canvasParentRef);
    p5.loadJSON(JSON_DATA_URL);
  };

  const draw = (p5) => {
    p5.background(255, 130, 20);
    p5.ellipse(100, 100, 100);
    p5.ellipse(300, 100, 100);
  };

  return <Sketch setup={setup} draw={draw} />;
}

export default P5map;
