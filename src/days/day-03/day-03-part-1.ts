import { readLines } from '../../utils/file';

const MUL_REGEX = /mul\((\d+),(\d+)\)/g;

function sumMuls(text: string) {
  let sum = 0;
  let match;
  while ((match = MUL_REGEX.exec(text)) !== null) {
    const a = parseInt(match[1]);
    const b = parseInt(match[2]);
    sum += a * b;
  }
  return sum;
}

const lines = await readLines('day-03', 'sample');

console.log(sumMuls(lines.join()));
