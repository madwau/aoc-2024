type Point = {
  x: number;
  y: number;
};

type Polygon = Point[];

type Line = [Point, Point];

type Ray = {
  position: Point;
  direction: {
    dx: number;
    dy: number;
  };
};

export function pointToString(point: Point): string {
  return `${point.x},${point.y}`;
}

export function pointInPolygon(point: Point, polygon: Polygon): boolean {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect =
      yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

export function manhattanDistance(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function areaOfPolygon(polygon: Polygon): number {
  let area = 0;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    area += xi * yj - xj * yi;
  }

  return Math.abs(area / 2);
}

export function overlap(a: Line, b: Line): boolean {
  function orientation(p: Point, q: Point, r: Point): number {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;
    return val > 0 ? 1 : 2;
  }

  function onSegment(p: Point, q: Point, r: Point): boolean {
    return (
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y)
    );
  }

  const [a1, a2] = a;
  const [b1, b2] = b;

  const o1 = orientation(a1, a2, b1);
  const o2 = orientation(a1, a2, b2);
  const o3 = orientation(b1, b2, a1);
  const o4 = orientation(b1, b2, a2);

  if (o1 !== o2 && o3 !== o4) return true;

  if (o1 === 0 && onSegment(a1, b1, a2)) return true;
  if (o2 === 0 && onSegment(a1, b2, a2)) return true;
  if (o3 === 0 && onSegment(b1, a1, b2)) return true;
  if (o4 === 0 && onSegment(b1, a2, b2)) return true;

  return false;
}

export function findIntersection(a: Ray, b: Ray): Point | null {
  const [a1, a2] = [
    a.position,
    { x: a.position.x + a.direction.dx, y: a.position.y + a.direction.dy },
  ];

  const [b1, b2] = [
    b.position,
    { x: b.position.x + b.direction.dx, y: b.position.y + b.direction.dy },
  ];

  const denominator = (a1.x - a2.x) * (b1.y - b2.y) - (a1.y - a2.y) * (b1.x - b2.x);

  if (denominator === 0) {
    return null;
  }

  const numerator = (a1.x - b1.x) * (b1.y - b2.y) - (a1.y - b1.y) * (b1.x - b2.x);
  const t = numerator / denominator;
  const x = a1.x + t * (a2.x - a1.x);
  const y = a1.y + t * (a2.y - a1.y);

  const intersection = { x, y };

  const inDirectionA =
    (a.direction.dx > 0 && x >= a.position.x) ||
    (a.direction.dx < 0 && x <= a.position.x) ||
    (a.direction.dy > 0 && y >= a.position.y) ||
    (a.direction.dy < 0 && y <= a.position.y);

  const inDirectionB =
    (b.direction.dx > 0 && x >= b.position.x) ||
    (b.direction.dx < 0 && x <= b.position.x) ||
    (b.direction.dy > 0 && y >= b.position.y) ||
    (b.direction.dy < 0 && y <= b.position.y);

  if (inDirectionA && inDirectionB) {
    return intersection;
  }

  return null;
}
