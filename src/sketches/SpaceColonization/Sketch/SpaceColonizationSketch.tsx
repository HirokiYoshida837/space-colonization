import React from "react";
import {SketchTemplate} from "@/components/SketchTemplate";
import {CanvasSize} from "../types/Common";
import p5Types from "p5";

import {SpaceColonization} from "../types/SpaceColonization"

let tree: SpaceColonization.Tree;
let tree2: SpaceColonization.Tree;
let tree3: SpaceColonization.Tree;

let attractions: Array<SpaceColonization.Attraction>;

const SpaceColonizationSketch: React.FC = () => {

  const canvasSize: CanvasSize = {
    width: 1000,
    height: 1000
  }


  const setUp = (p5: p5Types, canvasParentRef: Element) => {

    // general settings
    p5.createCanvas(canvasSize.width, canvasSize.height).parent(canvasParentRef);
    p5.frameRate(60);
    //HSBモードでの色指定に変更
    p5.colorMode('HSB', 360, 100, 100, 100);

    // SpaceColonization Settings
    attractions = SpaceColonization.createAttractors(p5, 1456, 3000, 0, canvasSize.width, 0, canvasSize.height);

    tree = {
      nodes: [
        {parentNodeIndex: -1, position: {x: canvasSize.width / 3, y: canvasSize.height}, associates: []}
      ],
      config: {
        infRad: 50,
        killRad: 25,
        radius: 5,
        color: 'yellow'
      }
    }

    tree2 = {
      nodes: [
        {parentNodeIndex: -1, position: {x: canvasSize.width / 3, y: canvasSize.height / 3}, associates: []},
      ],
      config: {
        infRad: 40,
        killRad: 25,
        radius: 10,
        color: 'green'
      }
    }

    tree3 = {
      nodes: [
        {parentNodeIndex: -1, position: {x: canvasSize.width * 3 / 5, y: canvasSize.height / 2}, associates: []},
      ],
      config: {
        infRad: 60,
        killRad: 25,
        radius: 5,
        color: 'cyan'
      }
    }

  }

  const draw = (p5: p5Types) => {
    // draw
    p5.background(0);

    const updateTree = SpaceColonization.updateTree(p5, tree, attractions);

    attractions = updateTree.attractions;
    tree = updateTree.tree;

    const updateTree2 = SpaceColonization.updateTree(p5, tree2, attractions);

    attractions = updateTree2.attractions;
    tree2 = updateTree2.tree;

    const updateTree3 = SpaceColonization.updateTree(p5, tree3, attractions);

    attractions = updateTree3.attractions;
    tree3 = updateTree3.tree;

    SpaceColonization.ShowTree(p5, tree);
    SpaceColonization.ShowTree(p5, tree2);
    SpaceColonization.ShowTree(p5, tree3);

    SpaceColonization.ShowAttractions(p5, attractions);
  }


  return (
    <>
      <SketchTemplate setup={setUp} draw={draw}/>
    </>
  )
}


export default SpaceColonizationSketch;
