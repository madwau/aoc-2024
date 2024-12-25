import { readLines } from '../../utils/file';
import { pairs } from '../../utils/math';

type Computer = string;
type Triple = [Computer, Computer, Computer];
type Edge = [Computer, Computer];

const lines = await readLines('day-23', 'input');
const edges: Edge[] = lines.map(line => line.split('-') as Edge);

function getConnections(): Record<Computer, Set<Computer>> {
  const graph: Record<Computer, Set<Computer>> = {};
  for (const [a, b] of edges) {
    if (!graph[a]) graph[a] = new Set();
    if (!graph[b]) graph[b] = new Set();
    graph[a].add(b);
    graph[b].add(a);
  }
  return graph;
}

const connections = getConnections();

function hash(triple: Triple): string {
  return triple.toSorted().join('-');
}

function interconnections(): Map<string, Triple> {
  const result: Map<string, Triple> = new Map();

  for (const a of Object.keys(connections)) {
    pairs([...connections[a]]).forEach(([b, c]) => {
      if (
        connections[b].has(a) &&
        connections[b].has(c) &&
        connections[c].has(a) &&
        connections[c].has(b)
      ) {
        result.set(hash([a, b, c]), [a, b, c]);
      }
    });
  }

  return result;
}

const triples = [...interconnections().values()];

console.log(triples.filter(set => set.some(computer => computer.startsWith('t'))).length);
