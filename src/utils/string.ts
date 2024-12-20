export function nums<T extends number[] = number[]>(text: string): T {
  return (text.match(/-?\d+/g) ?? []).map(Number) as T;
}

export function num(text: string): number {
  const numbers = nums(text);
  console.assert(numbers.length === 1, `Expected exactly one number, got ${numbers.length}`);
  return numbers[0];
}
