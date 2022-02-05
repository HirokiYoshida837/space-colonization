import React, { useState } from "react";
import p5Types from "p5";

import { SketchTemplate } from "@/sketchTemplate";

const canvasSize = {
  x: 500,
  y: 500,
};

/**
 * sample sketch for use react-useState hooks for changing parameter.
 * @constructor
 */
export const MySketch2: React.FC = () => {
  const [radius, setRadius] = useState(30);

  // FIXME もう少しスマートな書き方あったはず。
  const changeRadius = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let getValue: number = Number(e.target.value);
    setRadius(getValue);
  };

  const [ellipsePosX, setEllipsePosX] = useState(250);
  const changeEllipsePosX = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let getValue: number = Number(e.target.value);
    setEllipsePosX(getValue);
  };

  const [ellipsePosY, setEllipsePosY] = useState(250);
  const changeEllipsePosY = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let getValue: number = Number(e.target.value);
    setEllipsePosY(getValue);
  };

  const setUp = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(ellipsePosX, ellipsePosY, radius, radius);
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
          value={ellipsePosX}
          min="0"
          max="500"
          onChange={changeEllipsePosX}
        />
        pos X{" "}
        <input
          type="range"
          value={ellipsePosY}
          min="0"
          max="500"
          onChange={changeEllipsePosY}
        />
      </>
    </>
  );
};
