import { readLines } from '../../utils/file';
import { maximumClique } from '../../utils/graph';

type Computer = string;
type Edge = [Computer, Computer];

const lines = await readLines('day-23', 'input');
const edges: Edge[] = lines.map(line => line.split('-') as Edge);

console.log(maximumClique(edges).sort().join(','));
