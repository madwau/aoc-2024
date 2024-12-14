import { tally } from '../../utils/array';
import { readLines } from '../../utils/file';
import { product } from '../../utils/math';
import { nums } from '../../utils/string';

const STEPS = 100;

const BOUNDS = {
  width: 101,
  height: 103,
} as const;

const QUADRANTS = ['UL', 'UR', 'LL', 'LR'] as const;

type Quadrant = (typeof QUADRANTS)[number];

type Robot = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const lines = await readLines('day-14', 'input');

const robots: Robot[] = lines.map(line => {
  const [x, y, dx, dy] = nums(line);
  return { x, y, dx, dy };
});

function move(robot: Robot, steps: number): Robot {
  return {
    ...robot,
    x: (robot.x + (robot.dx + BOUNDS.width) * steps) % BOUNDS.width,
    y: (robot.y + (robot.dy + BOUNDS.height) * steps) % BOUNDS.height,
  };
}

function quadrant(robot: Robot): Quadrant | null {
  switch (true) {
    case robot.x < Math.floor(BOUNDS.width / 2) && robot.y < Math.floor(BOUNDS.height / 2):
      return 'UL';
    case robot.x >= Math.ceil(BOUNDS.width / 2) && robot.y < Math.floor(BOUNDS.height / 2):
      return 'UR';
    case robot.x < Math.floor(BOUNDS.width / 2) && robot.y >= Math.ceil(BOUNDS.height / 2):
      return 'LL';
    case robot.x >= Math.ceil(BOUNDS.width / 2) && robot.y >= Math.ceil(BOUNDS.height / 2):
      return 'LR';
    default:
      return null;
  }
}

const quadrants: Quadrant[] = robots
  .map(robot => move(robot, STEPS))
  .map(quadrant)
  .filter(quadrant => quadrant !== null);

console.log(product(Object.values(tally(quadrants))));
