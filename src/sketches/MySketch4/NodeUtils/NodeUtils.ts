import p5Types from "p5";
import {PointObj} from "@/sketches/MySketch4/types/Point";

/**
 * 一番近いNodeを探します。
 * @param p5
 * @param posX
 * @param posY
 * @param nodes
 * @param infrad
 */
export const searchNearestNode = (
  p5: p5Types,
  posX: number,
  posY: number,
  nodes: Array<PointObj>,
  infrad?: number
): number => {
  let nearestIndex = -1;
  let minDist = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < nodes.length; i++) {
    const d = p5.dist(posX, posY, nodes[i].posX, nodes[i].posY);

    if (minDist > d) {
      nearestIndex = i;
      minDist = d;
    }
  }

  if (infrad) {
    if (minDist > infrad) {
      return -1;
    } else {
      return nearestIndex;
    }
  } else {
    return nearestIndex;
  }
};

export const searchNears = (
  p5: p5Types,
  posX: number,
  posY: number,
  nodes: Array<PointObj>,
  killrad: number
) => {
  const nearIndexes = new Array<number>();

  for (let i = 0; i < nodes.length; i++) {
    const d = p5.dist(posX, posY, nodes[i].posX, nodes[i].posY);
    if (d < killrad) {
      nearIndexes.push(i);
    }
  }

  return nearIndexes;
};
