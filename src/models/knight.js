/* eslint-disable no-param-reassign */
import { areArraysEqual } from "../utils/listHelpers";

function createBoard() {
  const board = [];
  for (let x = 0; x < 8; x += 1) {
    board[x] = [];
    for (let y = 0; y < 8; y += 1) {
      board[x].push(null);
    }
  }
  return board;
}

function getMoves([x, y]) {
  const rules = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];
  const moves = [];

  rules.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;

    // Check if within board boundaries
    if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
      moves.push([newX, newY]);
    }
  });

  return moves;
}

function printPath(path) {
  let toString = "";
  path.forEach((next) => {
    toString += `(${next}) -> `;
  });
  toString += "null";
  return toString;
}

export default function knightMoves(s, e) {
  // Inititalize qeueu
  const q = [];
  q.push(s);

  // Inititalize board
  const visited = createBoard();
  visited[s[0]][s[1]] = s;

  // Inititalize path
  const path = [];

  // Search to the end node
  while (q.length > 0) {
    const curr = q.shift();
    // Exit the while loop if it is found;
    if (areArraysEqual(curr, e)) {
      break;
    }
    // Get all children;
    const children = getMoves(curr);
    // Queue children onto queue;
    children.forEach((child) => {
      const x = child[0];
      const y = child[1];
      if (!visited[x][y]) {
        q.push(child);
        visited[x][y] = curr;
      }
    });
  }
  // Reconscruct path
  let prev = e;
  path.unshift(prev);
  while (!areArraysEqual(prev, s)) {
    prev = visited[prev[0]][prev[1]];
    path.unshift(prev);
  }

  return printPath(path);
}

/**
 * Init Queue Q = [];
 * Init Array visited;
 * Init Array Path;
 *
 * Push start onto Q;
 *
 * While not found end:
 *      Dequeue front & set current to front;
 *      Get all adjacent vertexes from current;
 *      For each vertex:
 *          if vertex is not visited;
 *              Queue vertex onto Q;
 *              Mark vertex position as visited && set parent;
 * end loop
 *
 * While trace back parent from end point:
 *      Add each parent to path;
 * end loop
 *
 * Return Path
 */
