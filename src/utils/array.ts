export function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

export function chunkBy<T>(array: T[], predicate: (item: T) => boolean): T[][] {
  const chunks: T[][] = [];
  let chunk: T[] = [];

  for (const item of array) {
    if (predicate(item)) {
      chunks.push(chunk);
      chunk = [];
    } else {
      chunk.push(item);
    }
  }

  if (chunk.length) {
    chunks.push(chunk);
  }

  return chunks;
}

export function chunksOf<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  let chunk: T[] = [];

  for (const item of array) {
    if (chunk.length === size) {
      chunks.push(chunk);
      chunk = [];
    }

    chunk.push(item);
  }

  if (chunk.length) {
    chunks.push(chunk);
  }

  return chunks;
}

export function zip<T, U>(a: T[], b: U[]): [T, U][] {
  return a.map((item, index) => [item, b[index]]);
}

export function tally<T extends string | number | symbol>(array: T[]): Record<T, number> {
  return array.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    },
    {} as Record<T, number>,
  );
}

export function sortBy<T>(
  array: T[],
  predicate: (item: T) => number | number[],
  order: 'asc' | 'desc',
): T[] {
  return array.toSorted((a, b) => {
    let aValues = predicate(a);
    let bValues = predicate(b);

    if (!Array.isArray(aValues)) aValues = [aValues];
    if (!Array.isArray(bValues)) bValues = [bValues];

    for (let i = 0; i < aValues.length; i++) {
      if (aValues[i] === bValues[i]) continue;
      return order === 'asc' ? aValues[i] - bValues[i] : bValues[i] - aValues[i];
    }

    return 0;
  });
}

export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const a: T[] = [];
  const b: T[] = [];

  for (const item of array) {
    if (predicate(item)) {
      a.push(item);
    } else {
      b.push(item);
    }
  }

  return [a, b];
}

export function isPresent<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

export function firstPresent<T>(values: (T | undefined | null)[]): T | undefined {
  return values.find(isPresent);
}

export function isOneOf<T>(value: any, values: T[] | readonly T[]): value is T {
  return values.includes(value);
}

export function transpose<T>(array: T[][]): T[][] {
  return array[0].map((_, i) => array.map(row => row[i]));
}

export function isEqual<T extends number | string>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

export function repeat<T>(array: T[], times: number, separator?: T): T[] {
  const result: T[] = [];
  for (let i = 0; i < times; i++) {
    result.push(...array);
    if (separator !== undefined && i < times - 1) {
      result.push(separator);
    }
  }
  return result;
}

export function last<T>(array: T[]): T {
  return array[array.length - 1];
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function binaryInsert<T>(array: T[], value: T, compare: (a: T, b: T) => number): void {
  let low = 0;
  let high = array.length;

  while (low < high) {
    const mid = (low + high) >>> 1;
    if (compare(array[mid], value) < 0) low = mid + 1;
    else high = mid;
  }

  array.splice(low, 0, value);
}
