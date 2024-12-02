import { transpose, zipWith } from '../../utils/array';
import { readNumericLines } from '../../utils/file';
import { sum } from '../../utils/math';

const numericLines = await readNumericLines<[number, number][]>('day-01', 'input');

const sortedLists = transpose(numericLines).map(list => list.sort((a, b) => a - b));

console.log(sum(zipWith(sortedLists[0], sortedLists[1], (a, b) => Math.abs(a - b))));
