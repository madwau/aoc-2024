import { chunkBy, partition, transpose } from '../../utils/array';
import { readLines } from '../../utils/file';

type Type = 'lock' | 'key';
type Pins = [number, number, number, number, number];
type Lock = Pins;
type Key = Pins;

const lines = await readLines('day-25', 'input');

function parse(lines: string[]): { type: Type; pins: Pins } {
  const type = lines[0][0] === '#' ? 'lock' : 'key';
  const columns = type === 'lock' ? lines.slice(1) : lines.slice(0, -1);
  const rows = transpose(columns.map(line => line.split('')));
  const pins = rows.map(row => row.filter(cell => cell === '#').length) as Pins;
  return { type, pins };
}

const [locks, keys]: [Lock[], Key[]] = partition(
  chunkBy(lines, line => line === '').map(parse),
  ({ type }) => type === 'lock',
).map(items => items.map(({ pins }) => pins)) as [Lock[], Key[]];

function fits(lock: Lock, key: Key): boolean {
  return key.every((keyPin, index) => keyPin + lock[index] <= 5);
}

let count = 0;

for (const lock of locks) {
  for (const key of keys) {
    if (fits(lock, key)) {
      count++;
    }
  }
}

console.log(count);
