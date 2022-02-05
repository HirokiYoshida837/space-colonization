import React from "react";
import p5Types from "p5";

import { SketchTemplate } from "@/sketchTemplate";

let x = 50;
let y = 50;

export const MySketch1: React.FC = () => {
  const setUp = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;
  };

  return (
    <>
      <SketchTemplate setup={setUp} draw={draw} />
    </>
  );
};
