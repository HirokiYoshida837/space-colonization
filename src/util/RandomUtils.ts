import p5Types from "p5";

export const randomBetween = (p5: p5Types, min: number, max: number) =>
  min + p5.random() * (max - min);
