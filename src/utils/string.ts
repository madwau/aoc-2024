export function nums<T extends number[] = number[]>(text: string): T {
  return (text.match(/-?\d+/g) ?? []).map(Number) as T;
}
