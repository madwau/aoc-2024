import { readNumericLine } from '../../utils/file';

type Stone = number;

const stones: Stone[] = await readNumericLine('day-11', 'input');

function blink(stones: Stone[]): Stone[] {
  return stones.flatMap(stone => {
    const stoneStr = stone.toString();
    if (stone === 0) {
      return [1];
    } else if (stoneStr.length % 2 === 0) {
      const mid = stoneStr.length / 2;
      return [stoneStr.slice(0, mid), stoneStr.slice(mid)].map(Number);
    } else {
      return [stone * 2024];
    }
  });
}

function blinks(stones: Stone[], times: number): Stone[] {
  return times === 0 ? stones : blinks(blink(stones), times - 1);
}

console.log(blinks(stones, 25).length);
