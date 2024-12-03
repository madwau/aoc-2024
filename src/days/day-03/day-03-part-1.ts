import { readLines } from '../../utils/file';

const REGEX = /mul\((\d+),(\d+)\)/g;

function sumMuls(text: string) {
  let sum = 0;
  let match;
  while ((match = REGEX.exec(text)) !== null) {
    sum += Number(match[1]) * Number(match[2]);
  }
  return sum;
}

const lines = await readLines('day-03', 'input');

console.log(sumMuls(lines.join()));
