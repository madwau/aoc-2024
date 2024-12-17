import { HashSet } from './set';

type Point = {
  y: number;
  x: number;
};

function pointKey(point: Point): string {
  return `${point.y},${point.x}`;
}

export function longestPath<T>(
  grid: T[][],
  isNode: (point: Point) => boolean,
  neighbors: (point: Point) => Point[],
  start: Point,
  target: Point,
): number {
  const distances = new Map<string, number>();
  const sortedPoints = topologicalSort(grid, isNode, neighbors);

  distances.set(pointKey(start), 0);

  for (const point of sortedPoints) {
    const distance = distances.get(pointKey(point))!;

    for (const neighbor of neighbors(point)) {
      const neighborDistance = distances.get(pointKey(neighbor)) ?? -Infinity;

      if (neighborDistance < distance + 1) {
        distances.set(pointKey(neighbor), distance + 1);
      }
    }
  }

  return distances.get(pointKey(target))!;
}

function topologicalSort<T>(
  grid: T[][],
  isNode: (point: Point) => boolean,
  neighbors: (point: Point) => Point[],
): Point[] {
  const visited = new Set<string>();
  const stack: Point[] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const point = { y, x };

      if (isNode(point) && !visited.has(pointKey(point))) {
        dfs(grid, neighbors, point, visited, stack);
      }
    }
  }

  return stack.reverse();
}

function dfs<T>(
  grid: T[][],
  neighbors: (point: Point) => Point[],
  node: Point,
  visited: Set<string>,
  stack: Point[],
): void {
  visited.add(pointKey(node));

  for (const neighbor of neighbors(node)) {
    if (!visited.has(pointKey(neighbor))) {
      dfs(grid, neighbors, neighbor, visited, stack);
    }
  }

  stack.push(node);
}

export function connectedComponents<T extends number | string>(edges: [T, T][]): T[][] {
  const graph = new Map<T, T[]>();

  for (const [from, to] of edges) {
    graph.set(from, [...(graph.get(from) ?? []), to]);
    graph.set(to, [...(graph.get(to) ?? []), from]);
  }

  const visited = new Set<T>();
  const components: T[][] = [];

  for (const vertex of graph.keys()) {
    if (!visited.has(vertex)) {
      const component: T[] = [];
      dfsConnectedComponents(graph, vertex, visited, component);
      components.push(component);
    }
  }

  return components;
}

function dfsConnectedComponents<T>(
  graph: Map<T, T[]>,
  vertex: T,
  visited: Set<T>,
  component: T[],
): void {
  visited.add(vertex);
  component.push(vertex);

  for (const neighbor of graph.get(vertex) ?? []) {
    if (!visited.has(neighbor)) {
      dfsConnectedComponents(graph, neighbor, visited, component);
    }
  }
}

export function dijkstra<T>(
  neighbors: (node: T) => { node: T; cost: number }[],
  start: T,
  isTarget: (node: T) => boolean,
): number {
  const distances = new Map<T, number>(); // Map to track the shortest distance to each node
  const visited = new HashSet<T>(); // Set to track visited nodes
  const queue: [T, number][] = []; // Priority queue to process nodes [node, distance]

  distances.set(start, 0);
  queue.push([start, 0]);

  while (queue.length > 0) {
    queue.sort((a, b) => a[1] - b[1]);

    const [currentNode, currentDist] = queue.shift()!;

    if (visited.has(currentNode)) continue;

    visited.add(currentNode);

    if (isTarget(currentNode)) return currentDist;

    for (const { node: neighbor, cost } of neighbors(currentNode)) {
      if (visited.has(neighbor)) continue;

      const newDist = currentDist + cost;

      if (newDist < (distances.get(neighbor) ?? Infinity)) {
        distances.set(neighbor, newDist);
        queue.push([neighbor, newDist]);
      }
    }
  }

  return Infinity;
}
