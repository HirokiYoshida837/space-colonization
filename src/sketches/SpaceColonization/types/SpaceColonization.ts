import {Position} from "./Common";
import p5Types from "p5";

import {randomBetween} from "@/util/RandomUtils";

export namespace SpaceColonization {

  export interface Attraction {
    position: Position;
    active: boolean;
  }

  export interface Node {
    position: Position;
    associates: number[]
    parentNodeIndex: number;
  }

  export interface Candidate {
    position: Position;
    parentNodeIndex: number;
  }

  export interface Tree {
    nodes: Array<Node>;
    config: SpaceColonizationParams
  }

  export interface SpaceColonizationParams {
    killRad: number,
    infRad: number,
    radius: number,
    color?: string
    debug?: boolean
  }

  export const updateTree = (p5: p5Types, tree: Tree, attractions: Attraction[]) => {

    tree.nodes = tree.nodes.map(x => {
      x.associates = [];
      return x;
    })

    attractions.forEach((item, index) => {

      if (!item.active) {
        return;
      }

      const nearestIndex = searchNearestIndex(p5, item.position.x, item.position.y, tree.nodes, tree.config.infRad);

      if (nearestIndex >= 0) {
        tree.nodes[nearestIndex].associates.push(index);

        if (tree.config.debug) {
          p5.push();
          p5.strokeWeight(1);
          p5.stroke('gray');
          p5.noFill();
          p5.line(item.position.x, item.position.y, tree.nodes[nearestIndex].position.x, tree.nodes[nearestIndex].position.y)
          p5.pop();
        }
      }
    })

    const data = tree.nodes
      .map((node, index) => ({item: node, index}))
      .filter(x => x.item.associates.length > 0)
      .map(itemd => {
        const {item: item, index} = itemd;

        const vectors = item.associates
          .map(x => ({
            target: attractions[x].position,
            from: item.position
          }))
          .map(x => p5.createVector(x.target.x, x.target.y).sub(p5.createVector(x.from.x, x.from.y)))
          .map(x => x.normalize());

        let v = p5.createVector();
        vectors.forEach(x => v.add(x));
        v = v.normalize();

        return {
          associates: new Array<number>(),
          parentNodeIndex: index,
          position: {
            x: item.position.x + v.x * tree.config.radius * 2,
            y: item.position.y + v.y * tree.config.radius * 2
          }
        }
      }).filter(x => x != undefined)

    tree.nodes.push(...data)


    const t = tree.nodes.map(x => {
      return getAttractors(x.position.x, x.position.y, attractions, 25);
    });

    const willDeletelist = Array.from(new Set(
      new Array<number>().concat(...(t))
    ));

    willDeletelist.forEach(x => {
      attractions[x].active = false;
    })


    attractions = attractions.filter((_, index) => {
      return !willDeletelist.includes(index);
    });

    return {
      attractions,
      tree
    }
  }

  function getAttractors(x: number, y: number, attractions: Attraction[], killRad: number) {

    const calcDist = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    const willDeleteList = attractions
      .map((val, index) => {
        return {
          index,
          dist: calcDist(val.position.x, val.position.y, x, y)
        }
      }).filter(x => x.dist < killRad)
      .map(x => x.index)


    return willDeleteList;
  }


  // export const updateTree = (p5: p5Types, tree: Tree, attractions: Attraction[]) => {
  //
  //   tree.nodes = tree.nodes.map(x => {
  //     x.associates = new Array<number>();
  //     return x;
  //   });
  //
  //   attractions.forEach((item, index) => {
  //     const nearestIndex = searchNearestNode(p5, item.position.x, item.position.y, tree.nodes, 50);
  //     if (nearestIndex >= 0) {
  //       tree.nodes[nearestIndex].associates.push(index);
  //     }
  //   });
  //
  //
  //   tree.nodes.forEach((item, index) => {
  //     if (item.associates.length <= 0) {
  //       return;
  //     }
  //
  //     let vector = p5.createVector();
  //
  //     item.associates.forEach((x) => {
  //       let pointObj = attractions[x];
  //
  //       const target = p5.createVector(pointObj.position.x, pointObj.position.y);
  //       const from = p5.createVector(item.position.x, item.position.y);
  //       const diff = target.sub(from);
  //
  //       const normalizedDir = diff.normalize();
  //
  //       vector = vector.add(normalizedDir);
  //     });
  //
  //     vector = vector.normalize();
  //
  //     tree.nodes.push({
  //       associates: [],
  //       parentNodeIndex: index,
  //       position: {
  //         x: item.position.x + vector.x * 10,
  //         y: item.position.y + vector.y * 10
  //       }
  //     })
  //   })
  //
  //   const willDelete = createWillDeleteList(p5, tree.nodes, attractions, 25);
  //
  //   attractions = attractions.filter((item, index) => {
  //     return !willDelete.includes(index);
  //   });
  //
  //
  //   return {
  //     attractions, tree
  //   }
  //
  // }
  //
  // function createWillDeleteList(p5: p5Types, nodes: Node[], attractions: Attraction[], killrad: number) {
  //   const willDeleteList = nodes.map((item) => {
  //     return searchNears(p5, item.position.x, item.position.y, nodes, attractions, killrad);
  //   });
  //   // 重複排除のためにsetに
  //   return Array.from(new Set(
  //     new Array<number>().concat(...(willDeleteList))
  //   ));
  // }
  //
  // export const searchNears = (
  //   p5: p5Types,
  //   posX: number,
  //   posY: number,
  //   nodes: Array<Node>,
  //   attractions: Attraction[],
  //   killrad: number
  // ) => {
  //   const nearIndexes = new Array<number>();
  //
  //   for (let i = 0; i < nodes.length; i++) {
  //     const d = p5.dist(posX, posY, nodes[i].position.x, nodes[i].position.y);
  //     if (d < killrad) {
  //       nearIndexes.push(i);
  //     }
  //   }
  //
  //   return nearIndexes;
  // };


  // export const updateTree = (p5: p5Types, tree: Tree, attractions: Attraction[]) => {
  //
  //   // search nearest nodes from attractors
  //   // 連想配列を使っているが、Mapの方が良いかも。計算速度とか調査してみる
  //   const hash1: { [key: number]: number[]; } = {};
  //
  //   attractions
  //     .filter(x => x.active)
  //     .forEach((val, index) => {
  //       const nearestNodeIndex = getNearestNode(tree, val);
  //      
  //       if (nearestNodeIndex >= 0) {
  //
  //         p5.push()
  //
  //         p5.strokeWeight(1);
  //         p5.stroke('white');
  //         p5.noFill();
  //
  //         p5.line(val.position.x, val.position.y, tree.nodes[nearestNodeIndex].position.x, tree.nodes[nearestNodeIndex].position.y)
  //
  //         p5.pop();
  //        
  //        
  //         if (hash1[nearestNodeIndex]) {
  //           hash1[nearestNodeIndex].push(index);
  //         } else {
  //           hash1[nearestNodeIndex] = [index];
  //         }
  //       }
  //     });
  //
  //   // calculate new Nodes
  //   const newNodes = new Array<Node>();
  //   tree.nodes.forEach((val, index) => {
  //
  //     if (hash1[index] && hash1[index].length > 0) {
  //      
  //       let vector = p5.createVector();
  //       const from = p5.createVector(val.position.x, val.position.y);
  //
  //       hash1[index].forEach(attractIndex => {
  //         const attr = attractions[attractIndex];
  //         const target = p5.createVector(attr.position.x, attr.position.y);
  //        
  //
  //
  //
  //         const normalizedDirection = target.sub(from);
  //
  //
  //         vector.add(normalizedDirection.normalize());
  //       })
  //
  //       vector = vector.normalize();
  //
  //       // p5.line(from.x, from.y, val.position.x + vector.x * 10, val.position.y + vector.y * 10)
  //
  //
  //       const newNode: Node = {
  //         parentNodeIndex: index,
  //         position: {
  //           x: val.position.x + vector.x * 10,
  //           y: val.position.y + vector.y * 10
  //         }
  //       }
  //       newNodes.push(newNode);
  //     }
  //   });
  //   tree.nodes.push(...newNodes);
  //
  //   // de-activate attractors;
  //
  //   const willDeleteIndexList = new Array<number>();
  //
  //   tree.nodes.forEach(x => {
  //
  //     const calcDist = (p1: Position, p2: Position) => {
  //       return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
  //     }
  //
  //     attractions.forEach((attr, i) => {
  //       const dist = calcDist(x.position, attr.position);
  //       const killRad = 25;
  //
  //       if (dist <= killRad) {
  //         willDeleteIndexList.push(i)
  //       }
  //     })
  //   })
  //
  //   willDeleteIndexList.forEach(x => {
  //     attractions[x].active = false;
  //   })
  //
  //   return {
  //     attractions: attractions,
  //     tree: tree
  //   };
  //
  // }
  //
  // export const searchNearestNode = (
  //   p5: p5Types,
  //   posX: number,
  //   posY: number,
  //   nodes: Array<Node>,
  //   infrad?: number
  // ): number => {
  //   let nearestIndex = -1;
  //   let minDist = Number.MAX_SAFE_INTEGER;
  //
  //   for (let i = 0; i < nodes.length; i++) {
  //     const d = p5.dist(posX, posY, nodes[i].position.x, nodes[i].position.y);
  //
  //     if (minDist > d) {
  //       nearestIndex = i;
  //       minDist = d;
  //     }
  //   }
  //
  //   if (infrad) {
  //     if (minDist > infrad) {
  //       return -1;
  //     } else {
  //       return nearestIndex;
  //     }
  //   } else {
  //     return nearestIndex;
  //   }
  // };
  //
  // export const getNearestNode = (tree: Tree, attraction: Attraction, infrad = 50) => {
  //
  //   let nearestIndex = -1;
  //   let minDist = Number.MAX_SAFE_INTEGER;
  //
  //   const calcDist = (p1: Position, p2: Position) => {
  //     return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
  //   }
  //
  //   for (let i = 0; i < tree.nodes.length; i++) {
  //     const d = calcDist(tree.nodes[i].position, attraction.position);
  //
  //     if (minDist > d) {
  //       nearestIndex = i;
  //       minDist = d;
  //     }
  //   }
  //
  //   if (infrad) {
  //     if (minDist > infrad) {
  //       return -1;
  //     } else {
  //       return nearestIndex;
  //     }
  //   } else {
  //     return nearestIndex;
  //   }
  //
  // }


  export const ShowTree = (p5: p5Types, tree: Tree) => {
    p5.push()

    p5.strokeWeight(5);
    p5.noFill();

    tree.nodes.forEach((node, index) => {
      if (node.parentNodeIndex >= 0) {
        p5.stroke(180 * index / tree.nodes.length, 100, 100);

        // p5.stroke(tree.config.color ?? 'red');
        p5.line(tree.nodes[node.parentNodeIndex].position.x, tree.nodes[node.parentNodeIndex].position.y, node.position.x, node.position.y)
      }

      if (tree.config.debug) {
        p5.ellipse(node.position.x, node.position.y, tree.config.radius * 2);
      }

    });

    p5.pop();
  }

  export const ShowAttractions = (p5: p5Types, attractions: Attraction[]) => {
    p5.push()

    p5.strokeWeight(1);
    p5.stroke('blue');
    p5.noFill();

    attractions
      .forEach((attractor, index) => {
        p5.ellipse(attractor.position.x, attractor.position.y, 10)
      });

    p5.pop();
  }

  export const createAttractors = (p5: p5Types, randomSeed: number, nums: number, xmin: number, xmax: number, ymin: number, ymax: number): Array<Attraction> => {

    const array = new Array<Attraction>();

    p5.randomSeed(randomSeed);

    for (let i = 0; i < nums; i++) {

      const attr: Attraction = {
        active: true,
        position: {
          x: randomBetween(p5, xmin, xmax),
          y: randomBetween(p5, ymin, ymax)
        }
      };

      array.push(attr);

    }
    return array;
  }

  function searchNearestIndex(p5: p5Types, x1: number, y1: number, nodes: Node[], infrad: number) {

    let nearestIndex = -1;
    let minDist = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < nodes.length; i++) {
      const d = p5.dist(x1, y1, nodes[i].position.x, nodes[i].position.y);

      if (minDist > d) {
        nearestIndex = i;
        minDist = d;
      }
    }

    if (minDist > infrad) {
      return -1;
    } else {
      return nearestIndex;
    }
  }


}

