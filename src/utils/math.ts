export function isDigit(char: string) {
  return char >= '0' && char <= '9';
}

export function sum(numbers: number[]) {
  return numbers.reduce((sum, number) => sum + number, 0);
}

export function bigSum(numbers: bigint[]) {
  return numbers.reduce((sum, number) => sum + number, 0n);
}

export function max(numbers: number[]) {
  return numbers.reduce((max, number) => (number > max ? number : max), -Infinity);
}

export function product(numbers: number[]) {
  return numbers.reduce((product, number) => product * number, 1);
}

export function inRange(number: number, { min, max }: { min: number; max: number }) {
  return number >= min && number <= max;
}

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

export function lcm(numbers: number[]) {
  return numbers.reduce((lcm, number) => (lcm * number) / gcd(lcm, number), 1);
}

export function pairs<T>(array: T[]): [T, T][] {
  return array.flatMap((item, index) => array.slice(index + 1).map<[T, T]>(other => [item, other]));
}

export function cartesianPower<T>(array: T[], size: number): T[][] {
  return size === 0
    ? [[]]
    : array.flatMap(item => cartesianPower(array, size - 1).map(subarray => [item, ...subarray]));
}

export function hexToDec(hex: string): number {
  return parseInt(hex, 16);
}

export function positiveModulo(number: number, modulo: number) {
  return ((number % modulo) + modulo) % modulo;
}

export function quadraticPolynomial<T extends [number, number]>(
  values: [T, T, T],
): (x: number) => number {
  const [[x1, y1], [x2, y2], [x3, y3]] = values;

  const a = ((y1 - y2) / (x1 - x2) - (y2 - y3) / (x2 - x3)) / (x1 - x3);
  const b = (y1 - y2) / (x1 - x2) - a * (x1 + x2);
  const c = y1 - a * x1 ** 2 - b * x1;

  return (x: number) => a * x ** 2 + b * x + c;
}
