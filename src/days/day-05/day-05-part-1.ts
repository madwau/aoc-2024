import { chunkBy } from '../../utils/array';
import { readLines } from '../../utils/file';
import { sum } from '../../utils/math';
import { nums } from '../../utils/string';

type Rule = [number, number];
type Update = number[];

const lines = await readLines('day-05', 'input');
const [ruleLines, updateLines] = chunkBy(lines, line => !line);

const rules = ruleLines.map(nums<Rule>);
const updates = updateLines.map(nums<Update>);

function isCorrectlyOrdered(update: Update): boolean {
  return rules.every(([a, b]) => {
    const indexA = update.indexOf(a);
    const indexB = update.indexOf(b);
    return indexA === -1 || indexB === -1 || indexA < indexB;
  });
}

function middlePageNumber(update: Update): number {
  return update[Math.floor(update.length / 2)];
}

console.log(sum(updates.filter(isCorrectlyOrdered).map(middlePageNumber)));
