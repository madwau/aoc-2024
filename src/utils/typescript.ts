export function exhaustiveCheck(message: string, x: never): never {
  throw new Error(`${message}: ${x}`);
}
