export function nums<T extends number[] = number[]>(text: string): T {
  return text.split(/\D+/).map(Number) as T;
}
