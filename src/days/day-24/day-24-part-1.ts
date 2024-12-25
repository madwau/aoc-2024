import { chunkBy } from '../../utils/array';
import { readLines } from '../../utils/file';

type Wire = {
  name: string;
  value: number;
};

type Operator = 'AND' | 'OR' | 'XOR';

type Gate = {
  operator: Operator;
  input1: string;
  input2: string;
  output: string;
};

const lines = await readLines('day-24', 'input');
const [wireLines, gateLines] = chunkBy(lines, line => line === '');

const wires: Wire[] = wireLines.map(line => {
  const [name, value] = line.split(': ');
  return { name, value: Number(value) };
});

const gates: Gate[] = gateLines.map(line => {
  const [input1, operator, input2, _, output] = line.split(' ');
  return { operator, input1, input2, output } as Gate;
});

function computeValues(): Map<string, number> {
  const values = new Map<string, number>();

  for (const wire of wires) {
    values.set(wire.name, wire.value);
  }

  const queue = [...gates];

  while (queue.length > 0) {
    const gate = queue.find(
      gate => values.get(gate.input1) !== undefined && values.get(gate.input2) !== undefined,
    );
    if (!gate) break;

    const value1 = values.get(gate.input1)!;
    const value2 = values.get(gate.input2)!;

    let result: number;

    switch (gate.operator) {
      case 'AND':
        result = value1 & value2;
        break;
      case 'OR':
        result = value1 | value2;
        break;
      case 'XOR':
        result = value1 ^ value2;
        break;
    }

    values.set(gate.output, result);
    queue.splice(queue.indexOf(gate), 1);
  }

  return values;
}

function decimalOutput(values: Map<string, number>): bigint {
  const keys = [...values.keys()].filter(key => key.startsWith('z')).toSorted();
  return keys.reduce((acc, key, index) => acc + (BigInt(values.get(key)!) << BigInt(index)), 0n);
}

console.log(decimalOutput(computeValues()));
