import { chunkBy } from '../../utils/array';
import { readLines } from '../../utils/file';
import { HashMap } from '../../utils/map';

type Towel = string;
type Design = string;

const lines = await readLines('day-19', 'input');
const [[towelLine], designLines] = chunkBy(lines, line => line === '');

const towels: Towel[] = towelLine.split(', ') as Towel[];
const designs: Design[] = designLines as Design[];

const cache = new HashMap<Design, boolean>();

function isPossible(design: Design): boolean {
  if (design === '') return true;

  if (!cache.has(design)) {
    cache.set(
      design,
      towels
        .filter(towel => design.startsWith(towel))
        .some(towel => isPossible(design.slice(towel.length))),
    );
  }

  return cache.get(design)!;
}

console.log(designs.filter(isPossible).length);
