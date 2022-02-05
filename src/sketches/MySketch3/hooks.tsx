import React, { useState } from "react";
import { Position } from "@/sketches/MySketch3/types";

export const useRadiusHooks = () => {
  const [radius, setRadius] = useState(30);

  const changeRadius = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let getValue: number = Number(e.target.value);
    setRadius(getValue);
  };

  return {
    radius,
    setRadius,
    changeRadius,
  };
};

export const usePosHooks = () => {
  const [position, setPosition] = useState<Position>({ x: 250, y: 250 });

  const changeEllipsePosX = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let getValue: number = Number(e.target.value);
    setPosition((value) => {
      return {
        x: getValue,
        y: value.y,
      };
    });
  };

  const changeEllipsePosY = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let getValue: number = Number(e.target.value);
    setPosition((value) => {
      return {
        x: value.x,
        y: getValue,
      };
    });
  };

  return {
    position,
    setPosition,
    changeEllipsePosX,
    changeEllipsePosY,
  };
};
