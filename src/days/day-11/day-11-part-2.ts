import { readNumericLine } from '../../utils/file';
import { HashMap } from '../../utils/map';
import { sum } from '../../utils/math';

type Stone = number;

const stones: Stone[] = await readNumericLine('day-11', 'input');

const cache = new HashMap<{ stone: Stone; times: number }, number>();

function blink(stone: Stone, times: number): number {
  if (times === 0) return 1;

  const key = { stone, times };

  if (!cache.has(key)) {
    cache.set(
      key,
      (() => {
        const stoneStr = stone.toString();
        if (stone === 0) {
          return blink(1, times - 1);
        } else if (stoneStr.length % 2 === 0) {
          return (
            blink(Number(stoneStr.slice(0, stoneStr.length / 2)), times - 1) +
            blink(Number(stoneStr.slice(stoneStr.length / 2)), times - 1)
          );
        } else {
          return blink(stone * 2024, times - 1);
        }
      })(),
    );
  }

  return cache.get(key)!;
}

console.log(sum(stones.map(stone => blink(stone, 75))));
