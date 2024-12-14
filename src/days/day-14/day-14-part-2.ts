import { readLines } from '../../utils/file';
import { HashSet } from '../../utils/set';
import { nums } from '../../utils/string';

const BOUNDS = {
  width: 101,
  height: 103,
} as const;

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

function stepsUntilChristmasTree(): number {
  let steps = 0;
  let current = robots.slice();

  while (new HashSet(current.map(({ x, y }) => ({ x, y }))).size !== current.length) {
    current = current.map(robot => move(robot, 1));
    steps++;
  }

  return steps;
}

console.log(stepsUntilChristmasTree());
