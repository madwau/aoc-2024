import * as assert from 'node:assert';

function inputFilePath(day: string, file: string) {
  return `src/days/${day}/inputs/${file}.txt`;
}

export async function readLines(day: string, file: string): Promise<string[]> {
  const filePath = inputFilePath(day, file);
  const text = await Bun.file(filePath).text();
  return text.trim().split('\n');
}

export async function readLine(day: string, file: string): Promise<string> {
  const lines = await readLines(day, file);
  assert.strictEqual(lines.length, 1);
  return lines[0];
}

export async function readNumericLines<T extends number[][] = number[][]>(
  day: string,
  file: string,
): Promise<T> {
  const lines = await readLines(day, file);
  return lines.map(line => line.split(/\s+/).map(Number)) as T;
}

export async function readNumericLine<T extends number[] = number[]>(
  day: string,
  file: string,
): Promise<T> {
  const lines = await readNumericLines<T[]>(day, file);
  assert.strictEqual(lines.length, 1);
  return lines[0];
}

export async function readGrid<T extends string[][] = string[][]>(
  day: string,
  file: string,
): Promise<T> {
  const lines = await readLines(day, file);
  return lines.map(line => line.split('')) as T;
}

export async function readNumericGrid<T extends number[][] = number[][]>(
  day: string,
  file: string,
): Promise<T> {
  const lines = await readLines(day, file);
  return lines.map(line => line.split('').map(Number)) as T;
}
