import p5Types from "p5";

export interface Point {
  posX: number;
  posY: number;
  index: number;
}

export interface Drawable {
  draw: (p5: p5Types) => void;
}

export class PointObj implements Point, Drawable {
  draw(p5: p5Types): void {
    p5.push();

    p5.strokeWeight(1);
    p5.stroke(this.color);
    p5.noFill();
    p5.ellipse(this.posX, this.posY, 10, 10);

    p5.pop();
  }

  constructor(index: number, posX: number, posY: number, color = "red") {
    this.index = index;
    this.posX = posX;
    this.posY = posY;
    this.color = color;

    this.associates = new Array<number>();
  }

  index: number;
  posX: number;
  posY: number;

  color: string;

  associates: number[];
}

export const createAttractor = (point: Point) => {
  return new PointObj(point.index, point.posX, point.posY, "blue");
};

export const createNode = (point: Point) => {
  return new PointObj(point.index, point.posX, point.posY, "red");
};
