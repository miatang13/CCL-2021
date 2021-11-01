import React, { useRef, useState } from "react";
import Sketch from "react-p5";
import { MAP_DATA } from "../data/map.js";
import { getCategories } from "../data/utility";
import { p5MapObj } from "../p5/map-sketch.js";

function P5map() {
  const p5Map = useRef(null);
  const txt = useRef(null);

  const preload = (p5) => {
    txt.current = p5.loadStrings("prototype_data.txt", function () {
      console.log(txt.current);
    });
  };

  const setup = (p5, canvasParentRef) => {
    console.log("Set up p5 with", canvasParentRef);
    p5.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.9).parent(
      canvasParentRef
    );
    p5Map.current = new p5MapObj(p5);
    p5Map.current.init(["Category 1", "Category 2"]);
  };

  const draw = (p5) => {
    p5Map.current.drawFunc();
  };

  return <Sketch preload={preload} setup={setup} draw={draw} />;
}

export default P5map;
