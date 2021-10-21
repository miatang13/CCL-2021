import React from "react";
import Sketch from "react-p5";
import { MAP_DATA } from "../data/map.js";
import { getCategories } from "../data/utility";
import { p5MapObj } from "../p5/map-sketch.js";

function P5map() {
  var p5Map;
  const setup = (p5, canvasParentRef) => {
    console.log("Set up p5 with", canvasParentRef);
    p5.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.9).parent(
      canvasParentRef
    );
    p5Map = new p5MapObj(p5);
    p5Map.init(getCategories(MAP_DATA));
  };

  const draw = (p5) => {
    p5Map.drawFunc();
  };

  return <Sketch setup={setup} draw={draw} />;
}

export default P5map;
