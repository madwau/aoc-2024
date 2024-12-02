import { transpose } from '../../utils/array';
import { readNumericLines } from '../../utils/file';
import { sum } from '../../utils/math';

const numericLines = await readNumericLines<[number, number][]>('day-01', 'input');

const lists = transpose(numericLines);

console.log(sum(lists[0].map(a => a * lists[1].filter(b => b === a).length)));
