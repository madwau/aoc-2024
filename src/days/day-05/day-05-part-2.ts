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

function isIncorrectlyOrdered(update: Update): boolean {
  return rules.some(([a, b]) => {
    const indexA = update.indexOf(a);
    const indexB = update.indexOf(b);
    return indexA >= 0 && indexB >= 0 && indexA > indexB;
  });
}

function fixOrder(update: Update): Update {
  let fixedUpdate = update.slice();

  while (isIncorrectlyOrdered(fixedUpdate)) {
    fixedUpdate = rules.reduce((currentUpdate, [a, b]) => {
      const indexA = currentUpdate.indexOf(a);
      const indexB = currentUpdate.indexOf(b);
      if (indexA >= 0 && indexB >= 0 && indexA > indexB) {
        currentUpdate[indexA] = b;
        currentUpdate[indexB] = a;
      }
      return currentUpdate;
    }, fixedUpdate);
  }

  return fixedUpdate;
}

function middlePageNumber(update: Update): number {
  return update[Math.floor(update.length / 2)];
}

console.log(sum(updates.filter(isIncorrectlyOrdered).map(fixOrder).map(middlePageNumber)));
