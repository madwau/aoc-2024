import { chunkBy } from '../../utils/array';
import { readLines } from '../../utils/file';
import { HashMap } from '../../utils/map';
import { sum } from '../../utils/math';

type Towel = string;
type Design = string;

const lines = await readLines('day-19', 'input');
const [[towelLine], designLines] = chunkBy(lines, line => line === '');

const towels: Towel[] = towelLine.split(', ') as Towel[];
const designs: Design[] = designLines as Design[];

const cache = new HashMap<Design, number>();

function possibilities(design: Design): number {
  if (design === '') return 1;

  if (!cache.has(design)) {
    cache.set(
      design,
      sum(
        towels
          .filter(towel => design.startsWith(towel))
          .map(towel => possibilities(design.slice(towel.length))),
      ),
    );
  }

  return cache.get(design)!;
}

console.log(sum(designs.map(possibilities)));
