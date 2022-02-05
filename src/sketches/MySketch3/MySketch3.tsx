import React from "react";
import p5Types from "p5";

import { SketchTemplate } from "@/sketchTemplate";
import { usePosHooks, useRadiusHooks } from "@/sketches/MySketch3/hooks";

const canvasSize = {
  x: 500,
  y: 500,
};

/**
 * sample sketch for use react-useState hooks for changing parameter. </br>
 * using custom-hooks.
 *
 * @constructor
 */
export const MySketch3: React.FC = () => {
  // using States with custom-hooks.
  const { radius, changeRadius } = useRadiusHooks();
  const { position, changeEllipsePosX, changeEllipsePosY } = usePosHooks();

  const setUp = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(position.x, position.y, radius, radius);
  };

  return (
    <>
      <SketchTemplate setup={setUp} draw={draw} />

      <>
        radius{" "}
        <input
          type="number"
          value={radius}
          min="10"
          max="500"
          onChange={changeRadius}
        />{" "}
        pixel pos X{" "}
        <input
          type="range"
          value={position.x}
          min="0"
          max="500"
          onChange={changeEllipsePosX}
        />
        pos X{" "}
        <input
          type="range"
          value={position.y}
          min="0"
          max="500"
          onChange={changeEllipsePosY}
        />
      </>
    </>
  );
};
