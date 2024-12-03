import { readLines } from '../../utils/file';

const REGEX = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;

function sumMuls(text: string) {
  let sum = 0;
  let match;
  let enabled = true;
  while ((match = REGEX.exec(text)) !== null) {
    if (match[0] === 'do()') {
      enabled = true;
    } else if (match[0] === "don't()") {
      enabled = false;
    } else if (enabled) {
      sum += Number(match[1]) * Number(match[2]);
    }
  }
  return sum;
}

const lines = await readLines('day-03', 'input');

console.log(sumMuls(lines.join()));
